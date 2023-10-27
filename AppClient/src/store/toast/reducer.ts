import { createReducer } from '@reduxjs/toolkit';

import { ToastState } from './types';
import { toastShow, toastHide } from './actions';

const initialState: Partial<ToastState> = {
  isOpen: false,
};

export const toastReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(toastShow, (_, { payload }) => {
      return { isOpen: true, ...payload };
    })
    .addCase(toastHide, () => {
      return initialState;
    });
});
