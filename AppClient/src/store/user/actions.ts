import { createAction } from '@reduxjs/toolkit';

import { UserSetPayload } from './types';

const USER_ACTIONS = {
  setUser: createAction<UserSetPayload>('user/set'),
  clearUser: createAction('user/clear'),
  getCurrentUser: createAction('user/getCurrent'),
};

export default USER_ACTIONS;
