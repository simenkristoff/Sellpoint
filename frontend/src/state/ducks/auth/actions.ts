import { action } from 'typesafe-actions';
import { removeToken } from '@/state/utils/helpers';
import { AuthActionTypes, LoginCredentials } from './types';

/**
 * Send a login request to API
 * @param {LoginCredentials} data login credentials
 */
export const login = (data: LoginCredentials) => {
  return action(AuthActionTypes.LOGIN.START, data, {
    method: 'post',
    route: 'token-auth/',
  });
};

/**
 * Logout User.
 */
export const logout = () => {
  removeToken();

  return action(AuthActionTypes.LOGOUT);
};

/**
 * Clears Auth state
 */
export const clear = () => action(AuthActionTypes.CLEAR);
