import { call, put } from 'redux-saga/effects';
import { push } from 'redux-first-history';

import { PATHS } from '@/routes';
import LocalStorage from '@/helpers/localStorage';
import { TOKENS_KEY } from '@/helpers/localStorage/LocalSotrage.static';

import { toastShow } from '../toast/actions';

import USER_ACTIONS from './actions';
import { getCurrentUserApi } from './api';
import { User } from './types';

export function* getCurrentUser() {
  try {
    if (!LocalStorage.getItem(TOKENS_KEY)) return;
    const response: User = yield call(getCurrentUserApi);
    yield put(USER_ACTIONS.setUser(response));
  } catch (e) {
    yield put(push(PATHS.auth));
    yield put(
      toastShow({
        message: 'Nie udało się zalogować, spróbuj później.',
        variant: 'error',
      })
    );
    yield call(LocalStorage.removeItem, TOKENS_KEY);
  }
}
