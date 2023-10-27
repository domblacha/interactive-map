import { AxiosError } from 'axios';

export interface AsyncFetchParams<T = unknown> {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  body?: T;
}

export type Exception = AxiosError<{ message: string }>;
