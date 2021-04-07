import { BaseState, Entity, EntityId, ImageEntity, TMetaAction, TPayloadMetaAction } from '@/state/interface';
import { generateAsyncAction } from '@/state/utils';
import { UserEntity } from '@/state/ducks/user/types';
import { CategoryEntity } from '../category/types';

/**
 * The Product state extends BaseState
 * @typedef ProductState
 */
export type ProductState = {
  readonly favourites: ProductEntity[];
  readonly byUser: ProductEntity[];
} & BaseState<ProductEntity>;

/**
 * Interface describing a Product Entity
 * @interface ProductEntity
 */
export interface ProductEntity extends Entity {
  title: string;
  price: number;
  description: string | null;
  has_been_sold: boolean;
  location: string;
  category: EntityId;
  cat_details: CategoryEntity;
  owner: EntityId;
  owner_details: UserEntity;
  upload_date: string;
  images: ImageEntity[];
  favourited_by: number[];
}

/**
 * The available Product action types
 */
export const ProductActionTypes = {
  FETCH: generateAsyncAction('@@product.FETCH'),
  FETCH_BY_ID: generateAsyncAction('@@product.FETCH_BY_ID'),
  FETCH_FAVOURITES: generateAsyncAction('@@product.FETCH_FAVOURITES'),
  FETCH_USER_PRODUCTS: generateAsyncAction('@@product.FETCH_USER_PRODUCTS'),
  CREATE: generateAsyncAction('@@product.CREATE'),
  UPDATE: generateAsyncAction('@@product.UPDATE'),
  DELETE: generateAsyncAction('@@product.DELETE'),
  REMOVE_FAVOURITE: '@@product.REMOVE_FAVOURITE',
  CLEAR_USER_PRODUCTS: '@@product.CLEAR_USER_PRODUCTS',
  SET: '@@product.SET',
  CLEAR: '@@product.CLEAR',
};

/**
 * The available Product actions
 * @interface ProductActions
 */
export interface ProductActions {
  fetchProducts: () => TMetaAction;
  fetchFavourites: (userID: EntityId) => TPayloadMetaAction<EntityId>;
  fetchUserProducts: (userID: EntityId) => TPayloadMetaAction<EntityId>;
  createProduct: (product: ProductEntity) => TPayloadMetaAction<ProductEntity>;
  updateProduct: (product: ProductEntity) => TPayloadMetaAction<ProductEntity>;
  deleteProduct: (product: ProductEntity) => TPayloadMetaAction<ProductEntity>;
  removeFavourite: (product: ProductEntity) => TPayloadMetaAction<ProductEntity>;
  clearUserProducts: () => TMetaAction;
  setProduct: (product: ProductEntity) => TPayloadMetaAction<ProductEntity>;
  clear: () => TMetaAction;
}
