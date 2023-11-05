import { createAction } from '@reduxjs/toolkit';

import { AuthRegisterPayload, AuthLoginPayload } from './types';

const AUTH_ACTIONS = {
  registerUser: createAction<AuthRegisterPayload>('auth/register'),
  loginUser: createAction<AuthLoginPayload>('auth/login'),
  logoutUser: createAction('auth/logout'),
};

export default AUTH_ACTIONS;
