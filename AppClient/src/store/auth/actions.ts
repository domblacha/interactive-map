import { createAction } from '@reduxjs/toolkit';

import { AuthRegisterPayload, AuthLoginPayload } from './types';

const AUTH_REGISTER = 'auth/register';
const AUTH_LOGIN = 'auth/login';
const AUTH_LOGOUT = 'auth/logout';

const AUTH_ACTIONS = {
  registerUser: createAction<AuthRegisterPayload>(AUTH_REGISTER),
  loginUser: createAction<AuthLoginPayload>(AUTH_LOGIN),
  logoutUser: createAction(AUTH_LOGOUT),
};

export default AUTH_ACTIONS;
