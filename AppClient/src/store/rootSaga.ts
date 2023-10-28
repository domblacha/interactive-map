import { all } from 'redux-saga/effects';

import authSaga from './auth/saga';
import userSaga from './user/saga';
import mapSaga from './map/saga';

export function* rootSaga() {
  yield all([authSaga(), userSaga(), mapSaga()]);
}
