'use client';
import { axiosClient } from '@/services/axios';
import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRefreshToken } from './useRefreshToken';

const useAxiosAuth = () => {
  const { data: session } = useSession();

  // console.log('ses', session);
  const { refreshToken } = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosClient.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers[
            'Authorization'
          ] = `Bearer ${session?.user?.accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosClient.interceptors.response.use(
      async (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (401 === error?.response?.status && !prevRequest?.sent) {
          prevRequest.sent = true;
          try {
            await refreshToken();
            prevRequest.headers[
              'Authorization'
            ] = `Bearer ${session?.user?.accessToken}`;
            return axiosClient(prevRequest);
          } catch (err) {
            await signOut();
            window.location.replace('/auth/login');
          }
        } else {
          return Promise.reject(error);
        }
      }
    );

    return () => {
      axiosClient.interceptors.request.eject(requestIntercept);
      axiosClient.interceptors.response.eject(responseIntercept);
    };
  }, [session, refreshToken]);

  return axiosClient;
};

export default useAxiosAuth;
