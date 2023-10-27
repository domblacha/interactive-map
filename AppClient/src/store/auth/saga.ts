import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'redux-first-history';

import { Exception } from '@/helpers/asyncFetch/asyncFetch.types';
import LocalStorage from '@/helpers/localStorage';
import { Tokens } from '@/helpers/localStorage/LocalStorage.types';
import { TOKENS_KEY } from '@/helpers/localStorage/LocalSotrage.static';
import { PATHS } from '@/routes';

import { userClear, userSet } from '../user/actions';
import { applicationSetIsLoading } from '../application/actions';
import { getActiveUserApi } from '../user/api';
import { User } from '../user/types';
import { toastShow } from '../toast/actions';
import { authLogin, authLogout, authRegister } from './actions';
import { loginUserApi, logoutUserApi, registerUserApi } from './api';
import { LoginUserResponse, RegisterUserResponse } from './types';

export default function* authSaga() {
  yield takeLatest(authRegister.type, registerUser);
  yield takeLatest(authLogin.type, loginUser);
  yield takeLatest(authLogout.type, logoutUser);
}

function* registerUser(action: ReturnType<typeof authRegister>) {
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

function* loginUser(action: ReturnType<typeof authRegister>) {
  try {
    yield put(applicationSetIsLoading());
    const response: LoginUserResponse = yield call(
      loginUserApi,
      action.payload
    );

    const { accessToken, refreshToken } = response;

    yield call(LocalStorage.setItem<Tokens>, TOKENS_KEY, {
      accessToken,
      refreshToken,
    });

    const user: User = yield call(getActiveUserApi);

    yield put(userSet(user));
    yield put(applicationSetIsLoading());
    yield put(push('/dashboard'));
    yield put(
      toastShow({ message: 'Poprawnie zalogowano.', variant: 'success' })
    );
  } catch (e) {
    yield put(applicationSetIsLoading());
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
    yield put(userClear());
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
