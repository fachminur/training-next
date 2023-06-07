'use client';

import { axiosClient } from '../services/axios';
import { signIn, useSession } from 'next-auth/react';

export const useRefreshToken = () => {
  const { data: session, update } = useSession();

  const refreshToken = async () => {
    const res = await axiosClient.post('/refresh-token', {
      refreshToken: session?.user?.refreshToken,
      id: session?.user?.users?.id,
    });

    await update({
      ...session,
      user: {
        ...session.user,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      },
    });
  };
  return { refreshToken };
};
