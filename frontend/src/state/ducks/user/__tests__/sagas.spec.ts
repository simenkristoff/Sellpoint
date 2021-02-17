import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import apiCaller from '@/state/utils/apiCaller';
import { UserActionTypes } from '../types';
import { fetchUsers, fetchUserById } from '../actions';
import userSaga from '../sagas';

import userData from './__mockData__/userData';

describe('user saga', () => {
  it('should handle fetch success', () => {
    return expectSaga(userSaga)
      .provide([[matchers.call.fn(apiCaller), userData]])
      .put({ type: UserActionTypes.FETCH.SUCCESS, payload: userData })
      .dispatch(fetchUsers())
      .run();
  });

  it('should handle fetch error', () => {
    const error = new Error('An error occured');

    return expectSaga(userSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: UserActionTypes.FETCH.ERROR, payload: error.message })
      .dispatch(fetchUsers())
      .run();
  });

  it('should handle fetch one success', () => {
    return expectSaga(userSaga)
      .provide([[matchers.call.fn(apiCaller), userData[0]]])
      .put({ type: UserActionTypes.FETCH_ONE.SUCCESS, payload: userData[0] })
      .dispatch(fetchUserById(1))
      .run();
  });

  it('should handle fetch one error', () => {
    const error = new Error('An error occured');

    return expectSaga(userSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: UserActionTypes.FETCH_ONE.ERROR, payload: error.message })
      .dispatch(fetchUserById(1))
      .run();
  });
});
