import { BaseState, Entity, EntityId, TMetaAction, TPayloadMetaAction } from '@/state/interface';
import { generateAsyncAction } from '@/state/utils';

/**
 * The User state extends BaseState
 * @typedef UserState
 */
export type UserState = BaseState<UserEntity>;

/**
 * Interface describing a User Entity
 * @interface UserEntity
 */
export interface UserEntity extends Entity {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  rating: number;
}

/**
 * The available User action types
 */
export const UserActionTypes = {
  FETCH: generateAsyncAction('@@user.FETCH'),
  FETCH_BY_ID: generateAsyncAction('@@user.FETCH_BY_ID'),
  UPDATE: generateAsyncAction('@@user.UPDATE'),
  DELETE: generateAsyncAction('@@user.DELETE'),
  RATE_USER: generateAsyncAction('@@user.RATE_USER'),
  SET: '@@user.SET',
  CLEAR: '@@user.CLEAR',
};

/**
 * Payload for rating a user;
 */
export type RateData = {
  rater: EntityId;
  rate: number;
};

/**
 * The available User actions
 * @interface UserActions
 */
export interface UserActions {
  fetchUsers: () => TMetaAction;
  fetchUserById: (id: EntityId) => TPayloadMetaAction<EntityId>;
  setRating: (id: EntityId, data: RateData) => TPayloadMetaAction<RateData>;
  set: (user: UserEntity) => TPayloadMetaAction<UserEntity>;
  clear: () => TMetaAction;
}
