import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'redux-first-history';

import { PATHS } from '@/routes';
import LocalStorage from '@/helpers/localStorage';
import { TOKENS_KEY } from '@/helpers/localStorage/LocalSotrage.static';

import { userGetActive, userSet } from './actions';
import { getActiveUserApi } from './api';
import { User } from './types';
import { toastShow } from '../toast/actions';
import { applicationSetIsLoading } from '../application/actions';

export default function* userSaga() {
  yield takeLatest(userGetActive.type, getActiveUser);
}

function* getActiveUser() {
  try {
    yield put(applicationSetIsLoading());
    const response: User = yield call(getActiveUserApi);
    yield put(userSet(response));
    yield put(applicationSetIsLoading());
  } catch (e) {
    yield put(push(PATHS.auth));
    yield put(
      toastShow({
        message: 'Nie udało się zalogować, spróbuj później.',
        variant: 'error',
      })
    );
    yield call(LocalStorage.removeItem, TOKENS_KEY);
    yield put(applicationSetIsLoading());
  }
}
