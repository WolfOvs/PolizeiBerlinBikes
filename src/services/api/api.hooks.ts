import type { AxiosRequestConfig, Method } from 'axios';

type RequestConfig = AxiosRequestConfig & {
  url: string;
  method: Method;
  authenticated?: boolean;
};

export default function makeApiConfig(
  requestConfig: RequestConfig,
): AxiosRequestConfig {
  const authToken = window.localStorage.getItem('auth-token');
  const authHeader =
    requestConfig.authenticated && authToken !== null
      ? { Authorization: `Bearer ${authToken}` }
      : null;
  requestConfig.headers = {
    ...requestConfig.headers,
    ...authHeader,
  };
  return requestConfig;
}
