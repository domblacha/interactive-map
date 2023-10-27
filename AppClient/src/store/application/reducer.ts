import { createReducer } from '@reduxjs/toolkit';
import { ApplicationState } from './types';
import { applicationSetIsLoading } from './actions';

const initialState: ApplicationState = {
  isLoading: false,
};

export const applicationReducer = createReducer(initialState, (builder) => {
  builder.addCase(applicationSetIsLoading, (state) => {
    return {
      ...state,
      isLoading: !state.isLoading,
    };
  });
});
