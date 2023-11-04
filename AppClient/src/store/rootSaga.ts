import { all } from 'redux-saga/effects';

import authSaga from './auth/saga';
import mapSaga from './map/saga';
import appSaga from './application/saga';

export function* rootSaga() {
  yield all([authSaga(), mapSaga(), appSaga()]);
}
