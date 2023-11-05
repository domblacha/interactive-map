import { createReducer } from '@reduxjs/toolkit';
import { ApplicationState } from './types';
import APPLICATION_ACTION from './actions';

const initialState: ApplicationState = {
  isLoading: false,
};

export const applicationReducer = createReducer(initialState, (builder) => {
  builder.addCase(APPLICATION_ACTION.setLoading, (state) => {
    state.isLoading = !state.isLoading;
  });
});
