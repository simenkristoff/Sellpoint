import { action } from 'typesafe-actions';

import { login, logout } from '../actions';
import { AuthActionTypes } from '../types';

import { authLogin } from './__mockData__/authData';

describe('auth actions', () => {
  it('should post to: token-auth/', () => {
    const expectedAction = action(AuthActionTypes.LOGIN.START, authLogin, {
      method: 'post',
      route: 'token-auth/',
    });

    expect(login(authLogin)).toEqual(expectedAction);
  });

  it('should logout', () => {
    const expectedAction = action(AuthActionTypes.LOGOUT);

    expect(logout()).toEqual(expectedAction);
  });
});
