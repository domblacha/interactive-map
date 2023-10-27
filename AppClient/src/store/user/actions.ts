import { createAction } from '@reduxjs/toolkit';

import { UserSetPayload } from './types';

const USER_SET = 'user/set';
const USER_CLEAR = 'user/clear';
const USER_GET_ACTIVE = 'user/getActive';

export const userSet = createAction<UserSetPayload>(USER_SET);
export const userClear = createAction(USER_CLEAR);
export const userGetActive = createAction(USER_GET_ACTIVE);
