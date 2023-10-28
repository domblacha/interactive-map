import { createAction } from '@reduxjs/toolkit';

const APPLICATION_SET_LOADING = 'application/setLoading';

const APPLICATION_ACTION = {
  setLoading: createAction(APPLICATION_SET_LOADING),
};

export default APPLICATION_ACTION;
