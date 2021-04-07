import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { AuthToken, DecodedToken, TPayloadMetaAction } from '@/state/interface';
import { apiCaller, getToken, saveToken } from '@/state/utils';
import { AuthActionTypes, LoginCredentials, RegisterCredentials } from './types';
import jwtDecode from 'jwt-decode';

/**
 * Business logic of effect.
 */

function* handleLogin(params: TPayloadMetaAction<LoginCredentials>): Generator {
  try {
    const data: any = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield saveToken(data.token);
    yield put({ type: AuthActionTypes.LOGIN.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: AuthActionTypes.LOGIN.ERROR,
        payload: message,
      });
    } else {
      yield put({ type: AuthActionTypes.LOGIN.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

function* handleRegister(params: TPayloadMetaAction<RegisterCredentials>): Generator {
  try {
    const data: any = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield saveToken(data.token);
    const tokenData: any = yield jwtDecode(data.token);
    const { id, username, email, is_superuser, groups } = tokenData as DecodedToken;
    const auth_data = {
      id,
      username,
      email,
      is_superuser,
      groups,
      token: data.token,
    };
    yield put({ type: AuthActionTypes.REGISTER.SUCCESS, payload: auth_data });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: AuthActionTypes.REGISTER.ERROR,
        payload: message,
      });
    } else {
      yield put({ type: AuthActionTypes.REGISTER.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

/**
 * Watches every specified action and runs effect method and passes action args to it
 */
function* watchLoginRequest(): Generator {
  yield takeEvery(AuthActionTypes.LOGIN.START, handleLogin);
}

function* watchRegisterRequest(): Generator {
  yield takeEvery(AuthActionTypes.REGISTER.START, handleRegister);
}

/**
 * Saga init, forks in effects, other sagas
 */
export default function* authSaga() {
  yield all([fork(watchLoginRequest), fork(watchRegisterRequest)]);
}
