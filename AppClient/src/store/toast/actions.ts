import { createAction } from '@reduxjs/toolkit';

import { ToastShowAction } from './types';

export const toastShow = createAction<ToastShowAction>('toast/show');
export const toastHide = createAction('toast/Hide');
