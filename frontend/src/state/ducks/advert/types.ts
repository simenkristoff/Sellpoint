import { BaseState, Entity, EntityId, ImageEntity, TMetaAction, TPayloadMetaAction } from '@/state/interface';
import { generateAsyncAction } from '@/state/utils';

/**
 * The Advert state extends BaseState
 * @typedef AdvertState
 */
export type AdvertState = BaseState<AdvertEntity>;

/**
 * Interface describing a Advert Entity
 * @interface AdvertEntity
 */
export interface AdvertEntity extends Entity {
  title: string;
  link: string;
  duration: number;
  active: boolean;
  images: ImageEntity[];
  advertiser: EntityId;
  created_date: string;
  expiry_date: string;
}

/**
 * The available Advert action types
 */
export const AdvertActionTypes = {
  FETCH: generateAsyncAction('@@advert.FETCH'),
  FETCH_BY_ID: generateAsyncAction('@@advert.FETCH_BY_ID'),
  FETCH_BY_USER: generateAsyncAction('@@advert.FETCH_BY_USER'),
  CREATE: generateAsyncAction('@@advert.CREATE'),
  UPDATE: generateAsyncAction('@@advert.UPDATE'),
  DELETE: generateAsyncAction('@@advert.DELETE'),
  SET: '@@advert.SET',
  CLEAR: '@@advert.CLEAR',
};

/**
 * The available Advert actions
 * @interface AdvertActions
 */
export interface AdvertActions {
  fetchAdverts: () => TMetaAction;
  fetchAdvertsByUser: (userId: EntityId) => TPayloadMetaAction<EntityId>;
  createEvent: (advert: AdvertEntity) => TPayloadMetaAction<AdvertEntity>;
  updateEvent: (advert: AdvertEntity) => TPayloadMetaAction<AdvertEntity>;
  deleteEvent: (advert: AdvertEntity) => TPayloadMetaAction<AdvertEntity>;
  setAdvert: (advert: AdvertEntity) => TPayloadMetaAction<AdvertEntity>;
  clear: () => TMetaAction;
}
