import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'redux-first-history';

import { PATHS } from '@/routes';
import LocalStorage from '@/helpers/localStorage';
import { TOKENS_KEY } from '@/helpers/localStorage/LocalSotrage.static';

import { toastShow } from '../toast/actions';
import APPLICATION_ACTION from '../application/actions';

import USER_ACTIONS from './actions';
import { getCurrentUserApi } from './api';
import { User } from './types';

export default function* userSaga() {
  yield takeLatest(USER_ACTIONS.getCurrentUser.type, getCurrentUser);
}

function* getCurrentUser() {
  try {
    if (!LocalStorage.getItem(TOKENS_KEY)) return;
    yield put(APPLICATION_ACTION.setLoading());
    const response: User = yield call(getCurrentUserApi);
    yield put(USER_ACTIONS.setUser(response));
    yield put(APPLICATION_ACTION.setLoading());
  } catch (e) {
    yield put(push(PATHS.auth));
    yield put(
      toastShow({
        message: 'Nie udało się zalogować, spróbuj później.',
        variant: 'error',
      })
    );
    yield call(LocalStorage.removeItem, TOKENS_KEY);
    yield put(APPLICATION_ACTION.setLoading());
  }
}
