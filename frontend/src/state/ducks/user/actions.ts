import { action } from 'typesafe-actions';

import { UserActionTypes, UserEntity } from './types';
import { EntityId } from '@/state/interface';

/**
 * Fetch all Users.
 */
export const fetchUsers = () =>
  action(UserActionTypes.FETCH.START, [], {
    method: 'get',
    route: 'api/users/',
  });

/**
 * Fetch a single User by id.
 * @param id the id of the object to retrieve
 */
export const fetchUserById = (id: EntityId) =>
  action(UserActionTypes.FETCH_ONE.START, [], {
    method: 'get',
    route: `api/users/${id}/`,
  });

/**
 * Set User.
 * @param {UserEntity} data the User instance to set.
 */
export const setUser = (data: UserEntity) => action(UserActionTypes.SET, data);

/**
 * Clears User state
 */
export const clear = () => action(UserActionTypes.CLEAR);
