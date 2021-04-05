import { PayloadAction, PayloadMetaAction, TypeConstant } from 'typesafe-actions';
import { AuthState } from './ducks/auth/types';
import { CategoryState } from './ducks/category/types';
import { ProductState } from './ducks/product/types';
import { UserState } from './ducks/user/types';

/**
 * Type of Id.
 * @typedef EntityId
 */
export type EntityId = number;

/**
 * Type base entity of which all other entities is an extension of.
 * @typedef Entity
 * @member {string} id id of the database object
 */
export type Entity = {
  id: EntityId;
};

/**
 * Response message from backend
 * @typedef ApiResponse
 */
export type ApiResponse = { [key: string]: string };

/**
 * Type of state which allows for generic CRUD-actions.
 * @interface BaseState
 * @member {T | {}} byId the selected object
 * @member {T[]} data array of objects fetched from database
 * @member {boolean} loading state of action. Loading or done.
 * @member {string | null} status status of the action
 */
export interface BaseState<T extends Entity> {
  byId: T | {};
  readonly data: T[];
  readonly loading: boolean;
  readonly status: string | null;
}

/**
 * Interface for the applications store.
 * @interface IApplicationState
 */
export interface IApplicationState {
  auth: AuthState;
  category: CategoryState;
  user: UserState;
  product: ProductState;
}

/**
 * Type async actions has three states: START, SUCCESS, ERROR.
 * @type AsyncActionType
 * @member {string} START start state of the action
 * @member {string} SUCCESS success state of the action
 * @member {string} ERROR error state of the action
 */
export type AsyncActionType = {
  START: string;
  SUCCESS: string;
  ERROR: string;
};

/**
 * Type of meta-data.
 * @typedef IMeta
 */
export type IMeta = any;

/**
 * Interface of meta action which allows for an action type and meta-data.
 * @interface {IMetaAction<TType extends TypeConstant, TMeta>}
 * @member {TType} type the type of action
 * @member {TMeta} meta action meta-data
 */
export interface IMetaAction<TType extends TypeConstant, TMeta> {
  type: TType;
  meta: TMeta;
}

/**
 * Type MetaAction
 * @inteface IMetaAction
 * @typedef TMetaAction
 */
export type TMetaAction = IMetaAction<TypeConstant, IMeta>;

/**
 * Type of payload action which allows for an action type and payload.
 * @typedef TPayloadAction<TPayload>
 */
export type TPayloadAction<TPayload> = PayloadAction<TypeConstant, TPayload>;

/**
 * Type Interface of payload meta action which allows for an action type, payload and meta-data.
 * @typedef TPayloadMetaAction<TPayload>
 */
export type TPayloadMetaAction<TPayload> = PayloadMetaAction<TypeConstant, TPayload, IMeta>;

/**
 * Type of Encoded JWT token
 * @typedef EncodedToken
 */
export type EncodedToken = string;

/**
 * Interface of a decoded JWT Auth Token
 * @interface DecodedToken
 */
export interface DecodedToken {
  orig_iat: number;
  exp: number;
  user_id: EntityId;
  username: string;
  email: string;
  is_superuser: boolean;
}

export interface AuthToken extends DecodedToken {
  token: EncodedToken;
}

/**
 * Export all types
 */
export * from './ducks/auth/types';
