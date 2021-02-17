import { authReducer } from '../reducer';
import { AuthActionTypes } from '../types';
import { authLogin, authToken, signedInState, signedOutState, apiLoginSuccessResponse } from './__mockData__/authData';

describe('auth reducer', () => {
  it('should return initital signed in state', () => {
    expect(authReducer(signedInState, { type: 'no type', payload: [] })).toEqual(signedInState);
  });
  it('should set loading true on LOGIN.START', () => {
    expect(authReducer(signedOutState, { type: AuthActionTypes.LOGIN.START, payload: authLogin })).toEqual({
      ...signedOutState,
      loading: true,
    });
  });
  it('should update state on LOGIN.SUCCESS', () => {
    expect(
      authReducer(signedOutState, {
        type: AuthActionTypes.LOGIN.SUCCESS,
        payload: apiLoginSuccessResponse,
      }),
    ).toEqual({
      ...signedOutState,
      isLoggedIn: true,
      username: apiLoginSuccessResponse.username,
      email: apiLoginSuccessResponse.email,
      token: authToken,
      loading: false,
      status: null,
    });
  });
  it('should update status on *.ERROR', () => {
    expect(authReducer(signedOutState, { type: AuthActionTypes.LOGIN.ERROR, payload: 'An error occured' })).toEqual({
      ...signedOutState,
      status: 'An error occured',
    });
  });
  it('should reset auth state on LOGOUT', () => {
    expect(
      authReducer(signedInState, {
        type: AuthActionTypes.LOGOUT,
        payload: [],
      }),
    ).toEqual({
      ...signedOutState,
    });
  });
});
