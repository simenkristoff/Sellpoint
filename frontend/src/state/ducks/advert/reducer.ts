import { Action, TypeConstant, PayloadAction } from 'typesafe-actions';

import { AdvertActionTypes, AdvertEntity, AdvertState } from './types';

import { updateObjectInArray, deleteObjectInArray } from '@/state/utils';

export const initialState: AdvertState = {
  byId: {},
  data: [],
  loading: false,
  status: null,
};

/**
 * Reducer actions for Adverts.
 * @param {AdvertState} state the initial state.
 * @param {Action<TypeConstant> & PayloadAction<TypeConstant, any>} action the action and state params to set.
 */
export const advertReducer = (
  state: AdvertState = initialState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, any>,
): AdvertState => {
  switch (action.type) {
    case AdvertActionTypes.FETCH.START:
    case AdvertActionTypes.FETCH_BY_ID.START:
    case AdvertActionTypes.FETCH_BY_USER.START:
    case AdvertActionTypes.CREATE.START:
    case AdvertActionTypes.UPDATE.START:
    case AdvertActionTypes.DELETE.START: {
      return { ...state, loading: true, status: null };
    }
    case AdvertActionTypes.FETCH.SUCCESS:
    case AdvertActionTypes.FETCH_BY_USER.SUCCESS: {
      return { ...initialState, data: action.payload, loading: false, status: null };
    }
    case AdvertActionTypes.FETCH_BY_ID.SUCCESS: {
      return { ...state, byId: action.payload, loading: false, status: null };
    }
    case AdvertActionTypes.CREATE.SUCCESS: {
      return { ...state, data: [...state.data, action.payload], loading: false, status: null };
    }
    case AdvertActionTypes.UPDATE.SUCCESS: {
      return {
        ...state,
        byId: action.payload,
        data: updateObjectInArray<AdvertEntity>(state.data, action),
        loading: false,
        status: null,
      };
    }
    case AdvertActionTypes.DELETE.SUCCESS: {
      return {
        ...state,
        data: deleteObjectInArray<AdvertEntity>(state.data, action),
        loading: false,
        status: null,
      };
    }
    case AdvertActionTypes.SET: {
      return { ...state, byId: action.payload, loading: false, status: null };
    }
    case AdvertActionTypes.FETCH.ERROR:
    case AdvertActionTypes.FETCH_BY_ID.ERROR:
    case AdvertActionTypes.FETCH_BY_USER.ERROR:
    case AdvertActionTypes.CREATE.ERROR:
    case AdvertActionTypes.UPDATE.ERROR:
    case AdvertActionTypes.DELETE.ERROR: {
      return {
        ...state,
        loading: false,
        status: action.payload,
      };
    }
    case AdvertActionTypes.CLEAR:
      return {
        ...state,
        loading: false,
        status: null,
      };
    default:
      return state;
  }
};
