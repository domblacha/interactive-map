import axios from 'axios';

import { AsyncFetchParams, Exception } from './asyncFetch.types';
import LocalStorage from '../localStorage';
import { Tokens } from '../localStorage/LocalStorage.types';
import { TOKENS_KEY } from '../localStorage/LocalSotrage.static';

const customeFetch = axios.create({
  baseURL: 'https://localhost:3001/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

customeFetch.interceptors.request.use(
  async (config) => {
    const tokens = LocalStorage.getItem<Tokens>(TOKENS_KEY);

    if (tokens) {
      config.headers['Authorization'] = `Bearer ${tokens.accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

async function refreshToken(): Promise<Tokens | undefined> {
  try {
    const tokens = LocalStorage.getItem<Tokens>(TOKENS_KEY);
    const response = await customeFetch.post('/auth/refresh-token', {
      accessToken: tokens?.accessToken,
      refreshToken: tokens?.refreshToken,
    });

    return response.data;
  } catch (error) {
    console.error('Error', error);
  }
}

customeFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const orginalRequest = error.config;
    if (error.response.status === 401 && !orginalRequest._retry) {
      orginalRequest._retry = true;

      const response = await refreshToken();

      if (response) {
        const { accessToken, refreshToken } = response;

        LocalStorage.setItem<Tokens>(TOKENS_KEY, {
          accessToken,
          refreshToken,
        });

        customeFetch.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${response?.accessToken}`;
      } else {
        history.pushState({}, '', '/auth');
        history.go();
        LocalStorage.removeItem(TOKENS_KEY);
      }
      return customeFetch(orginalRequest);
    }
    return Promise.reject(error);
  }
);

export default async function asyncFetch<ResponseType = void>({
  method = 'GET',
  url,
  body = {},
}: AsyncFetchParams): Promise<ResponseType> {
  try {
    const response = await customeFetch<ResponseType>({
      method,
      url: 'https://localhost:3001/api/' + url,
      data: body,
    });

    return response.data;
  } catch (err) {
    const error = err as Exception;
    throw error;
  }
}
