import { Action, TypeConstant, PayloadAction } from 'typesafe-actions';

import { getToken } from '@/state/utils';
import { AuthToken } from '@/state/interface';
import { AuthActionTypes, AuthState } from './types';

/**
 * Define reducer actions used to manage the auth state.
 */

// Check if there is a auth token stored in local web storage.
const currentUser: AuthToken | undefined = getToken();

export const loggetOutState: AuthState = {
  username: null,
  email: null,
  token: null,
  isLoggedIn: false,
  loading: false,
  status: null,
};
/**
 * If there is an auth token stored in web storage, the initial state on
 * page load/reload will be the state of the data stored in the auth token, i.e
 * the user will be logged in.
 */
export const initialState: AuthState = currentUser
  ? {
      username: currentUser.username,
      email: currentUser.email,
      token: currentUser.token,
      isLoggedIn: true,
      loading: false,
      status: null,
    }
  : loggetOutState;

export const authReducer = (
  state: AuthState = initialState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, any>,
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN.START:
    case AuthActionTypes.REGISTER.START:
      return { ...state, loading: true, status: null };

    case AuthActionTypes.LOGIN.SUCCESS:
    case AuthActionTypes.REGISTER.SUCCESS:
      return {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
        token: action.payload.token,
        isLoggedIn: true,
        loading: false,
        status: null,
      };
    case AuthActionTypes.LOGIN.ERROR:
    case AuthActionTypes.REGISTER.ERROR:
      return {
        ...state,
        loading: false,
        status: action.payload,
      };

    case AuthActionTypes.LOGOUT:
      return {
        ...loggetOutState,
      };
    case AuthActionTypes.CLEAR:
      return {
        ...state,
        loading: false,
        status: null,
      };

    default:
      return state;
  }
};
