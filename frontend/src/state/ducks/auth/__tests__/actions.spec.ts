import { action } from 'typesafe-actions';

import { login, logout } from '../actions';
import { AuthActionTypes } from '../types';

import { authLogin } from './__mockData__/authData';

describe('auth actions', () => {
  it('should post to: user/login/', () => {
    const expectedAction = action(AuthActionTypes.LOGIN.START, authLogin, {
      method: 'post',
      route: 'user/login/',
    });

    expect(login(authLogin)).toEqual(expectedAction);
  });

  it('should logout', () => {
    const expectedAction = action(AuthActionTypes.LOGOUT);

    expect(logout()).toEqual(expectedAction);
  });
});
