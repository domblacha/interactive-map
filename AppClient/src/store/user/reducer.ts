import { createReducer } from '@reduxjs/toolkit';
import { UserState } from './types';
import { userClear, userSet } from './actions';

const initialState: UserState = {
  isLoggedIn: false,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(userSet, (state, { payload }) => {
      return {
        ...state,
        ...payload,
        isLoggedIn: true,
      };
    })
    .addCase(userClear, () => {
      return initialState;
    });
});
