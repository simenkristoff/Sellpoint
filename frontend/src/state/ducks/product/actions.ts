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
export const fetchProductById = (id: EntityId | string) =>
  action(ProductActionTypes.FETCH_BY_ID.START, [], {
    method: 'get',
    route: `product/products/${id}/`,
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
 * Set Product.
 * @param {ProductEntity} data the Product instance to set.
 */
export const setProduct = (data: ProductEntity | {}) => action(ProductActionTypes.SET, data);

/**
 * Clears Product state
 */
export const clear = () => action(ProductActionTypes.CLEAR);
