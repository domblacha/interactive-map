import { createAction } from '@reduxjs/toolkit';

import { UserSetPayload } from './types';

const USER_SET = 'user/set';
const USER_CLEAR = 'user/clear';
const USER_GET_CURRENT = 'user/getCurrent';

const USER_ACTIONS = {
  setUser: createAction<UserSetPayload>(USER_SET),
  clearUser: createAction(USER_CLEAR),
  getCurrentUser: createAction(USER_GET_CURRENT),
};

export default USER_ACTIONS;
