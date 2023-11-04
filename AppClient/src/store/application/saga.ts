import { call, put, takeLatest } from 'redux-saga/effects';
import APPLICATION_ACTION from './actions';
import { getAllMarkers } from '../map/saga';
import { getCurrentUser } from '../user/saga';

export default function* appSaga() {
  yield takeLatest(APPLICATION_ACTION.initApp.type, initApplication);
}

function* initApplication() {
  yield put(APPLICATION_ACTION.setLoading());
  yield call(getAllMarkers);
  yield call(getCurrentUser);
  yield put(APPLICATION_ACTION.setLoading());
}
