import { action } from 'typesafe-actions';

import { UserActionTypes, UserEntity } from './types';
import { EntityId } from '@/state/interface';

/**
 * Fetch all Users.
 */
export const fetchUsers = () =>
  action(UserActionTypes.FETCH.START, [], {
    method: 'get',
    route: 'user/users/',
  });

/**
 * Fetch a single User by id.
 * @param id the id of the object to retrieve
 */
export const fetchUserById = (id: EntityId | string) =>
  action(UserActionTypes.FETCH_BY_ID.START, [], {
    method: 'get',
    route: `user/users/${id}/`,
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

/** 
 * Delete a User.
 * @param {UserEntity} data the user instance to delete
*/
export const deleteUser = (data: UserEntity) => 
action(UserActionTypes.DELETE.START, data, {
  method: 'delete',
  route: `user/users/${data.id}/`,

});

/**
 * Update a User Profile
 *  @param {UserEntity} data the User instance to set.
 */

export const updateProfile = (data: UserEntity) => 
action(UserActionTypes.UPDATE.START, data, {

  method: 'put',
  route: `user/users/${data.id}/`,

});