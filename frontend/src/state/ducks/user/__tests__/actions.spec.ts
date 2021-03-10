import { action } from 'typesafe-actions';

import { UserActionTypes, UserEntity } from '../types';

import { clear, fetchUsers, fetchUserById, setUser } from '../actions';

import userData from './__mockData__/userData';

describe('user actions', () => {
  it('should call @@user.FETCH.START', () => {
    const expectedAction = action(UserActionTypes.FETCH.START, [], {
      method: 'get',
      route: 'api/users/',
    });

    expect(fetchUsers()).toEqual(expectedAction);
  });

  it('should call @@event.FETCH_ONE.START', () => {
    const expectedAction = action(UserActionTypes.FETCH_ONE.START, [], {
      method: 'get',
      route: 'api/users/123/',
    });

    expect(fetchUserById(123)).toEqual(expectedAction);
  });

  it('should call @@user.SET', () => {
    const payload: UserEntity = userData[1];
    const expectedAction = action(UserActionTypes.SET, payload);

    expect(setUser(payload)).toEqual(expectedAction);
  });

  it('should call @user.CLEAR', () => {
    const expectedAction = action(UserActionTypes.CLEAR);

    expect(clear()).toEqual(expectedAction);
  });
});
