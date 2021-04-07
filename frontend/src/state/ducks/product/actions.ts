import { EntityId } from '@/state/interface';
import { action } from 'typesafe-actions';

import { ProductActionTypes, ProductEntity } from './types';

/**
 * Fetch all Products.
 */
export const fetchProducts = () => {
  return action(ProductActionTypes.FETCH.START, [], {
    method: 'get',
    route: 'product/products/',
  });
};

/**
 * Fetch a single Product by id.
 * @param id the id of the object to retrieve
 */
export const fetchProductById = (id: EntityId) =>
  action(ProductActionTypes.FETCH_BY_ID.START, [], {
    method: 'get',
    route: `product/products/${id}/`,
  });

/**
 * Fetch a users favourite products by user id.
 * @param id the id of the user
 */
export const fetchFavourites = (id: EntityId) =>
  action(ProductActionTypes.FETCH_FAVOURITES.START, [], {
    method: 'get',
    route: `product/favourites/${id}`,
  });

/**
 * Fetch a products by user id.
 * @param id the id of the user
 */
export const fetchUserProducts = (id: EntityId) =>
  action(ProductActionTypes.FETCH_USER_PRODUCTS.START, [], {
    method: 'get',
    route: `product/products/?by=${id}`,
  });

/**
 * Create a new Product.
 * @param {ProductEntity} data the Product to create.
 */
export const createProduct = (data: ProductEntity) =>
  action(ProductActionTypes.CREATE.START, data, {
    method: 'post',
    route: 'product/products/',
  });

/**
 * Update a Product.
 * @param {ProductEntity} data the Product instance with updated data.
 */
export const updateProduct = (data: ProductEntity) =>
  action(ProductActionTypes.UPDATE.START, data, {
    method: 'put',
    route: `product/products/${data.id}/`,
  });

/**
 * Delete Product.
 * @param {ProductEntity} data the Product instance to delete.
 */
export const deleteProduct = (data: ProductEntity) =>
  action(ProductActionTypes.DELETE.START, data, {
    method: 'delete',
    route: `product/products/${data.id}/`,
  });

/**
 * Remove favourite.
 * @param {ProductEntity} data the Product instance to remove.
 */
export const removeFavourite = (data: ProductEntity) => action(ProductActionTypes.REMOVE_FAVOURITE, data);

/**
 * Clears User Product state
 */
export const clearUserProducts = () => action(ProductActionTypes.CLEAR_USER_PRODUCTS);

/**
 * Set Product.
 * @param {ProductEntity} data the Product instance to set.
 */
export const setProduct = (data: ProductEntity | {}) => action(ProductActionTypes.SET, data);

/**
 * Clears Product state
 */
export const clear = () => action(ProductActionTypes.CLEAR);
