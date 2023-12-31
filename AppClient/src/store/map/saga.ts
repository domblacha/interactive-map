import { call, put, takeLatest } from 'redux-saga/effects';

import APPLICATION_ACTION from '../application/actions';
import { toastShow } from '../toast/actions';

import { MAP_ACTION } from './actions';
import { Comment, Marker } from './types';
import { createCommentApi, createMarkerApi, getAllMarkersApi } from './api';

export default function* mapSaga() {
  yield takeLatest(MAP_ACTION.createMarker.type, createMarker);
  yield takeLatest(MAP_ACTION.createComment.type, createComment);
}

export function* getAllMarkers() {
  try {
    const response: Marker[] = yield call(getAllMarkersApi);
    yield put(MAP_ACTION.setMarkers(response));
  } catch (e) {
    yield put(
      toastShow({
        message: 'Nie udało się załądować znaczników, spróbuj później.',
        variant: 'error',
      })
    );
  }
}

function* createMarker({
  payload,
}: ReturnType<typeof MAP_ACTION.createMarker>) {
  try {
    yield put(APPLICATION_ACTION.setLoading());
    const response: Marker = yield call(createMarkerApi, payload);
    yield put(MAP_ACTION.setMarker(response));
    yield put(APPLICATION_ACTION.setLoading());
  } catch (e) {
    yield put(
      toastShow({
        message: 'Nie udało się dodać znacznika, spróbuj później.',
        variant: 'error',
      })
    );
    yield put(APPLICATION_ACTION.setLoading());
  }
}

function* createComment({
  payload,
}: ReturnType<typeof MAP_ACTION.createComment>) {
  try {
    yield put(APPLICATION_ACTION.setLoading());
    const response: Comment = yield call(createCommentApi, payload);
    yield put(MAP_ACTION.setComment(response));
    yield put(APPLICATION_ACTION.setLoading());
  } catch (e) {
    yield put(
      toastShow({
        message: 'Nie udało się dodać komentarza, spróbuj później.',
        variant: 'error',
      })
    );
    yield put(APPLICATION_ACTION.setLoading());
  }
}
