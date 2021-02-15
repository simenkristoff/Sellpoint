import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { TPayloadMetaAction } from '@/state/interface';
import { apiCaller, saveToken } from '@/state/utils';
import { AuthActionTypes, LoginCredentials } from './types';

/**
 * Business logic of effect.
 */

function* handleLogin(params: TPayloadMetaAction<LoginCredentials>): Generator {
  try {
    const { token, user }: any = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield saveToken(token);
    yield put({ type: AuthActionTypes.LOGIN.SUCCESS, payload: { user, token } });
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

/**
 * Watches every specified action and runs effect method and passes action args to it
 */
function* watchLoginRequest(): Generator {
  yield takeEvery(AuthActionTypes.LOGIN.START, handleLogin);
}

/**
 * Saga init, forks in effects, other sagas
 */
export default function* authSaga() {
  yield all([fork(watchLoginRequest)]);
}
