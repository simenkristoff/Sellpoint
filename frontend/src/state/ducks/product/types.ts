import { BaseState, Entity, EntityId, TMetaAction, TPayloadMetaAction } from '@/state/interface';
import { generateAsyncAction } from '@/state/utils';
import { UserEntity } from '@/state/ducks/user/types';

/**
 * The Product state extends BaseState
 * @typedef ProductState
 */
export type ProductState = BaseState<ProductEntity>;

/**
 * Interface describing a Product Entity
 * @interface ProductEntity
 */
export interface ProductEntity extends Entity {
  title: string;
  price: number;
  description: string | null;
  has_been_sold: boolean;
  category?: string[];
  owner: EntityId;
  owner_details: UserEntity;
  upload_date: string;
  image: string;
}

/**
 * The available Product action types
 */
export const ProductActionTypes = {
  FETCH: generateAsyncAction('@@product.FETCH'),
  FETCH_BY_ID: generateAsyncAction('@@product.FETCH_BY_ID'),
  CREATE: generateAsyncAction('@@product.CREATE'),
  UPDATE: generateAsyncAction('@@product.UPDATE'),
  DELETE: generateAsyncAction('@@product.DELETE'),
  SET: '@@product.SET',
  CLEAR: '@@product.CLEAR',
};

/**
 * The available Product actions
 * @interface ProductActions
 */
export interface ProductActions {
  fetchProducts: () => TMetaAction;
  createEvent: (product: ProductEntity) => TPayloadMetaAction<ProductEntity>;
  updateEvent: (product: ProductEntity) => TPayloadMetaAction<ProductEntity>;
  deleteEvent: (product: ProductEntity) => TPayloadMetaAction<ProductEntity>;
  setProduct: (product: ProductEntity) => TPayloadMetaAction<ProductEntity>;
  clear: () => TMetaAction;
}
