import { deleteObjectInArray, updateObjectInArray } from '@/state/utils';
import { Action, TypeConstant, PayloadAction } from 'typesafe-actions';

import { UserActionTypes, UserEntity, UserState } from './types';

export const initialState: UserState = {
  byId: {},
  data: [],
  loading: false,
  status: null,
};

/**
 * Reducer actions for Users.
 * @param {UserState} state the initial state.
 * @param {Action<TypeConstant> & PayloadAction<TypeConstant, any>} action the action and state params to set.
 */
export const userReducer = (
  state: UserState = initialState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, any>,
): UserState => {
  switch (action.type) {
    case UserActionTypes.FETCH.START:
    case UserActionTypes.FETCH_BY_ID.START:
    case UserActionTypes.DELETE.START:
    case UserActionTypes.RATE_USER.START: {
      return { ...state, loading: true, status: null };
    }
    case UserActionTypes.FETCH.SUCCESS: {
      return { ...state, data: action.payload, loading: false, status: null };
    }
    case UserActionTypes.FETCH_BY_ID.SUCCESS: {
      return { ...state, byId: action.payload, loading: false, status: null };
    }

    case UserActionTypes.DELETE.SUCCESS: {
      return {
        ...state,
        data: deleteObjectInArray<UserEntity>(state.data, action),
        loading: false,
        status: null,
      };
    }
    case UserActionTypes.RATE_USER.SUCCESS: {
      return {
        ...state,
        byId: { ...state.byId, rating: action.payload },
        loading: false,
        status: null,
      };
    }

    case UserActionTypes.UPDATE.SUCCESS: {
      return {
        ...state,
        byId: action.payload,
        data: updateObjectInArray<UserEntity>(state.data, action),
        loading: false,
        status: null,
      };
    }

    case UserActionTypes.SET: {
      return { ...state, byId: action.payload, loading: false, status: null };
    }

    case UserActionTypes.FETCH.ERROR:
    case UserActionTypes.FETCH_BY_ID.ERROR:
    case UserActionTypes.RATE_USER.ERROR:
    case UserActionTypes.DELETE.ERROR: {
      return {
        ...state,
        loading: false,
        status: action.payload,
      };
    }
    case UserActionTypes.CLEAR: {
      return {
        ...state,
        loading: false,
        status: null,
      };
    }
    default:
      return state;
  }
};
