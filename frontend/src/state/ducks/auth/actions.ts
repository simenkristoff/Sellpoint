import { action } from 'typesafe-actions';
import { removeToken } from '@/state/utils';
import { AuthActionTypes, LoginCredentials, RegisterCredentials } from './types';

/**
 * Define auth functions, which are used to send/request data to REST Api.
 */

/**
 * Send a login request to API
 * @param {LoginCredentials} data login credentials
 */
export const login = (data: LoginCredentials) => {
  return action(AuthActionTypes.LOGIN.START, data, {
    method: 'post',
    route: 'user/login/',
  });
};

/**
 * Send a register request to API
 * @param {LoginCredentials} data login credentials
 */
export const register = (data: RegisterCredentials) => {
  return action(AuthActionTypes.REGISTER.START, data, {
    method: 'post',
    route: 'user/register/',
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
