import { Action, TypeConstant, PayloadAction } from 'typesafe-actions';

import { getToken } from '@/state/utils';

import { AuthActionTypes, AuthState } from './types';

const currentUser = getToken();

export const loggetOutState: AuthState = {
  username: null,
  token: null,
  isLoggedIn: false,
  loading: false,
  status: null,
};

export const initialState: AuthState = currentUser
  ? {
      username: currentUser.user.username,
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
      return { ...state, loading: true, status: null };

    case AuthActionTypes.LOGIN.SUCCESS:
      return {
        ...state,
        username: action.payload.user.username,
        token: action.payload.token,
        isLoggedIn: true,
        loading: false,
        status: null,
      };
    case AuthActionTypes.LOGIN.ERROR:
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
