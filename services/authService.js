import { axiosClient } from './axios';

export function loginService(values) {
  return axiosClient.post('/login', values);
}
