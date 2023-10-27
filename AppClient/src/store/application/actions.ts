import { createAction } from '@reduxjs/toolkit';

const APPLICATION_SET_IS_LOADING = 'application/setIsLoading';
const APPLICATION_INIT = 'application/init';

export const applicationSetIsLoading = createAction(APPLICATION_SET_IS_LOADING);
export const applicationInit = createAction(APPLICATION_INIT);
