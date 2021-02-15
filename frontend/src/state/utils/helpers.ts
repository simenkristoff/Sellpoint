import _ from 'lodash';
import { Action, PayloadAction, TypeConstant } from 'typesafe-actions';
import jwtDecode from 'jwt-decode';
import cookie from 'js-cookie';
import moment from 'moment';

import { Entity, AuthToken, DecodedToken } from '../interface';

const COOKIE_STORAGE_KEY = 'auth_token';

/**
 * Stores a JWT Auth Token in the web storage
 * @param {string} token the token to be stored
 */
export function saveToken(token: string) {
  const decoded: DecodedToken = jwtDecode(token);
  const expires = moment.unix(decoded.exp);

  return cookie.set(COOKIE_STORAGE_KEY, token, {
    path: '/',
    expires: expires.toDate(),
    secure: process.env.NODE_ENV === 'production',
  });
}

/**
 * Removes a JWT Auth token from the web storage
 */
export function removeToken() {
  return cookie.remove(COOKIE_STORAGE_KEY, { path: '/' });
}

/**
 * Retrieves a JWT Auth Token from the web storage
 */
export function getToken(): AuthToken | undefined {
  const token = cookie.get(COOKIE_STORAGE_KEY);
  if (!token) return;
  try {
    const decoded: DecodedToken = jwtDecode(token);
    console.log(decoded);

    return {
      ...decoded,
      token,
    };
  } catch (err) {
    console.log('No cookie found');
  }
}

/**
 * Updates a given array with data recieved from an api call.
 * @param {T[]} array the array to update
 * @param {Action} action action type with payload
 */
export function updateObjectInArray<T extends Entity>(array: T[], action: Action<TypeConstant> & PayloadAction<TypeConstant, T>) {
  return array.map(item => {
    if (item.id !== action.payload.id) {
      return item;
    }

    return { ...item, ...action.payload };
  });
}

/**
 * Deletes an object recieved from an api call from a given array.
 * @param {T[]} array the array to update
 * @param {Action} action action type with payload
 */
export function deleteObjectInArray<T>(array: T[], action: Action<TypeConstant> & PayloadAction<TypeConstant, T>) {
  return _.without(array, action.payload);
}
