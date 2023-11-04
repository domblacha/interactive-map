import { createAction } from '@reduxjs/toolkit';

const APPLICATION_ACTION = {
  setLoading: createAction('application/setLoading'),
  initApp: createAction('application/init'),
};

export default APPLICATION_ACTION;
