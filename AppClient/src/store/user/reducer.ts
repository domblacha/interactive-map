import { createReducer } from '@reduxjs/toolkit';
import { UserState } from './types';
import USER_ACTIONS from './actions';

const initialState: UserState = {
  isLoggedIn: false,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(USER_ACTIONS.setUser, (state, { payload }) => {
      return {
        ...state,
        ...payload,
        isLoggedIn: true,
      };
    })
    .addCase(USER_ACTIONS.clearUser, () => {
      return initialState;
    });
});
