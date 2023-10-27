import { createAction } from '@reduxjs/toolkit';

import { AuthRegisterPayload, AuthLoginPayload } from './types';

const AUTH_REGISTER = 'auth/register';
const AUTH_LOGIN = 'auth/login';
const AUTH_LOGOUT = 'auth/logout';

export const authRegister = createAction<AuthRegisterPayload>(AUTH_REGISTER);
export const authLogin = createAction<AuthLoginPayload>(AUTH_LOGIN);
export const authLogout = createAction(AUTH_LOGOUT);
