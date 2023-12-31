import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'redux-first-history';

import { Exception } from '@/helpers/asyncFetch/asyncFetch.types';
import LocalStorage from '@/helpers/localStorage';
import { Tokens } from '@/helpers/localStorage/LocalStorage.types';
import { TOKENS_KEY } from '@/helpers/localStorage/LocalSotrage.static';
import { PATHS } from '@/routes';

import USER_ACTIONS from '../user/actions';
import APPLICATION_ACTION from '../application/actions';
import { getCurrentUserApi } from '../user/api';
import { User } from '../user/types';
import { toastShow } from '../toast/actions';
import AUTH_ACTIONS from './actions';
import { loginUserApi, logoutUserApi, registerUserApi } from './api';
import { LoginUserResponse, RegisterUserResponse } from './types';

export default function* authSaga() {
  yield takeLatest(AUTH_ACTIONS.registerUser.type, registerUser);
  yield takeLatest(AUTH_ACTIONS.loginUser.type, loginUser);
  yield takeLatest(AUTH_ACTIONS.logoutUser.type, logoutUser);
}

function* registerUser(action: ReturnType<typeof AUTH_ACTIONS.registerUser>) {
  try {
    const response: RegisterUserResponse = yield call(
      registerUserApi,
      action.payload
    );
    if (response.isSuccess) {
      yield put(toastShow({ message: response.message, variant: 'success' }));
      yield put(push(PATHS.confirmEmail));
    } else {
      yield put(toastShow({ message: response.message, variant: 'error' }));
    }
  } catch (e) {
    yield put(
      toastShow({
        message: (e as Exception).response?.data.message,
        variant: 'error',
      })
    );
  }
}

function* loginUser(action: ReturnType<typeof AUTH_ACTIONS.registerUser>) {
  try {
    yield put(APPLICATION_ACTION.setLoading());
    const response: LoginUserResponse = yield call(
      loginUserApi,
      action.payload
    );

    const { accessToken, refreshToken } = response;

    yield call(LocalStorage.setItem<Tokens>, TOKENS_KEY, {
      accessToken,
      refreshToken,
    });

    const user: User = yield call(getCurrentUserApi);

    yield put(USER_ACTIONS.setUser(user));
    yield put(APPLICATION_ACTION.setLoading());
    yield put(push('/dashboard'));
    yield put(
      toastShow({ message: 'Poprawnie zalogowano.', variant: 'success' })
    );
  } catch (e) {
    yield put(APPLICATION_ACTION.setLoading());
    yield put(
      toastShow({
        message: (e as Exception).response?.data.message,
        variant: 'error',
      })
    );
  }
}

function* logoutUser() {
  try {
    yield call(logoutUserApi);
    yield call(LocalStorage.removeItem, TOKENS_KEY);
    yield put(USER_ACTIONS.clearUser());
    yield put(push('/auth'));
    yield put(
      toastShow({ message: 'Poprawnie wylogowano.', variant: 'success' })
    );
  } catch (e) {
    yield put(
      toastShow({
        message: (e as Exception).response?.data.message,
        variant: 'error',
      })
    );
  }
}
