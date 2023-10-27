import asyncFetch from '@/helpers/asyncFetch';
import { User } from './types';

const GET_USER_URL = 'user/current-user';

export const getActiveUserApi = async () =>
  await asyncFetch<User>({
    url: GET_USER_URL,
  });
