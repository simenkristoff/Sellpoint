import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { apiCaller } from '@/state/utils';
import { AuthActionTypes } from '../types';
import authSaga from '../sagas';
import { login } from '../actions';

import { authLogin, apiLoginSuccessResponse } from './__mockData__/authData';

describe('auth saga', () => {
  it('should handle login success', () => {
    return expectSaga(authSaga)
      .provide([[matchers.call.fn(apiCaller), apiLoginSuccessResponse]])
      .put({ type: AuthActionTypes.LOGIN.SUCCESS, payload: apiLoginSuccessResponse })
      .dispatch(login(authLogin))
      .run();
  });
  it('should handle login error', () => {
    const error = new Error('login error');

    return expectSaga(authSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: AuthActionTypes.LOGIN.ERROR, payload: error.message })
      .dispatch(login(authLogin))
      .run();
  });
});
