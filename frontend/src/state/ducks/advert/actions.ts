import { EntityId } from '@/state/interface';
import { action } from 'typesafe-actions';

import { AdvertActionTypes, AdvertEntity } from './types';

/**
 * Fetch all Adverts.
 */
export const fetchAdverts = () => {
  return action(AdvertActionTypes.FETCH.START, [], {
    method: 'get',
    route: '_vert/_verts/',
  });
};

/**
 * Fetch a single Advert by id.
 * @param id the id of the object to retrieve
 */
export const fetchAdvertById = (id: EntityId | string) =>
  action(AdvertActionTypes.FETCH_BY_ID.START, [], {
    method: 'get',
    route: `_vert/_verts/${id}/`,
  });

/**
 * Fetch a single Advert by User.
 * @param id the id of the User
 */
export const fetchAdvertByUser = (id: EntityId | string) =>
  action(AdvertActionTypes.FETCH_BY_USER.START, [], {
    method: 'get',
    route: `_vert/_verts/?by=${id}`,
  });

/**
 * Create a new Advert.
 * @param {AdvertEntity} data the Advert to create.
 */
export const createAdvert = (data: AdvertEntity) =>
  action(AdvertActionTypes.CREATE.START, data, {
    method: 'post',
    route: '_vert/_verts/',
  });

/**
 * Update a Advert.
 * @param {AdvertEntity} data the Advert instance with updated data.
 */
export const updateAdvert = (data: AdvertEntity) =>
  action(AdvertActionTypes.UPDATE.START, data, {
    method: 'put',
    route: `_vert/_verts/${data.id}/`,
  });

/**
 * Delete Advert.
 * @param {AdvertEntity} data the Advert instance to delete.
 */
export const deleteAdvert = (data: AdvertEntity) =>
  action(AdvertActionTypes.DELETE.START, data, {
    method: 'delete',
    route: `_vert/_verts/${data.id}/`,
  });

/**
 * Set Advert.
 * @param {AdvertEntity} data the Advert instance to set.
 */
export const setAdvert = (data: AdvertEntity | {}) => action(AdvertActionTypes.SET, data);

/**
 * Clears Advert state
 */
export const clear = () => action(AdvertActionTypes.CLEAR);
