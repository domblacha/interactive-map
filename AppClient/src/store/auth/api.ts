import asyncFetch from '@/helpers/asyncFetch';

import {
  AuthRegisterPayload,
  AuthLoginPayload,
  LoginUserResponse,
  RegisterUserResponse,
} from './types';

const REGISTER_URL = 'auth/register';
const LOGIN_URL = 'auth/login';
const LOGOUT_URL = 'auth/logout';

export const registerUserApi = async (body: AuthRegisterPayload) =>
  await asyncFetch<RegisterUserResponse>({
    url: REGISTER_URL,
    body,
    method: 'POST',
  });

export const loginUserApi = async (body: AuthLoginPayload) =>
  await asyncFetch<LoginUserResponse>({
    url: LOGIN_URL,
    body,
    method: 'POST',
  });

export const logoutUserApi = async () =>
  await asyncFetch({
    url: LOGOUT_URL,
    method: 'POST',
  });
