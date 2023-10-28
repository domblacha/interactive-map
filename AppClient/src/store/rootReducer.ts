import { combineReducers } from 'redux';
import { Reducer } from '@reduxjs/toolkit';
import { RouterState } from 'redux-first-history';
import { toastReducer } from './toast/reducer';
import { userReducer } from './user/reducer';
import { applicationReducer } from './application/reducer';
import { mapReducer } from './map/reducer';

const rootReducer = (routerReducer: Reducer<RouterState>) =>
  combineReducers({
    application: applicationReducer,
    toast: toastReducer,
    user: userReducer,
    map: mapReducer,
    router: routerReducer,
  });

export default rootReducer;
