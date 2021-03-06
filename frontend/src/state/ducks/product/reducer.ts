import { Action, TypeConstant, PayloadAction } from 'typesafe-actions';

import { ProductActionTypes, ProductEntity, ProductState } from './types';

import { updateObjectInArray, deleteObjectInArray } from '@/state/utils';

export const initialState: ProductState = {
  byId: {},
  data: [],
  favourites: [],
  byUser: [],
  loading: false,
  status: null,
};

/**
 * Reducer actions for Products.
 * @param {ProductState} state the initial state.
 * @param {Action<TypeConstant> & PayloadAction<TypeConstant, any>} action the action and state params to set.
 */
export const productReducer = (
  state: ProductState = initialState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, any>,
): ProductState => {
  switch (action.type) {
    case ProductActionTypes.FETCH.START:
    case ProductActionTypes.FETCH_BY_ID.START:
    case ProductActionTypes.CREATE.START:
    case ProductActionTypes.FETCH_FAVOURITES.START:
    case ProductActionTypes.FETCH_USER_PRODUCTS.START:
    case ProductActionTypes.DELETE.START: {
      return { ...state, loading: true, status: null };
    }
    case ProductActionTypes.UPDATE.START: {
      return { ...state, status: null };
    }
    case ProductActionTypes.FETCH.SUCCESS: {
      return { ...initialState, data: action.payload, loading: false, status: null };
    }
    case ProductActionTypes.FETCH_BY_ID.SUCCESS: {
      return { ...state, byId: action.payload, loading: false, status: null };
    }
    case ProductActionTypes.CREATE.SUCCESS: {
      return { ...state, data: [...state.data, action.payload], loading: false, status: null };
    }
    case ProductActionTypes.FETCH_FAVOURITES.SUCCESS: {
      return { ...state, favourites: action.payload, loading: false, status: null };
    }
    case ProductActionTypes.FETCH_USER_PRODUCTS.SUCCESS: {
      return { ...state, byUser: action.payload, loading: false, status: null };
    }
    case ProductActionTypes.UPDATE.SUCCESS: {
      return {
        ...state,
        byId: action.payload,
        data: updateObjectInArray<ProductEntity>(state.data, action),
        loading: false,
        status: null,
      };
    }
    case ProductActionTypes.DELETE.SUCCESS: {
      return {
        ...state,
        data: deleteObjectInArray<ProductEntity>(state.data, action),
        loading: false,
        status: null,
      };
    }
    case ProductActionTypes.REMOVE_FAVOURITE: {
      return { ...state, favourites: deleteObjectInArray<ProductEntity>(state.favourites, action) };
    }
    case ProductActionTypes.SET: {
      return { ...state, byId: action.payload, loading: false, status: null };
    }
    case ProductActionTypes.FETCH.ERROR:
    case ProductActionTypes.FETCH_BY_ID.ERROR:
    case ProductActionTypes.CREATE.ERROR:
    case ProductActionTypes.FETCH_FAVOURITES.ERROR:
    case ProductActionTypes.FETCH_USER_PRODUCTS.ERROR:
    case ProductActionTypes.UPDATE.ERROR:
    case ProductActionTypes.DELETE.ERROR: {
      return {
        ...state,
        loading: false,
        status: action.payload,
      };
    }
    case ProductActionTypes.CLEAR_USER_PRODUCTS: {
      return {
        ...state,
        byUser: [],
      };
    }
    case ProductActionTypes.CLEAR:
      return {
        ...state,
        loading: false,
        status: null,
      };
    default:
      return state;
  }
};
