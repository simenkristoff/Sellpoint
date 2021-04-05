import { Action, TypeConstant, PayloadAction } from 'typesafe-actions';

import { CategoryActionTypes, CategoryEntity, CategoryState } from './types';

import { updateObjectInArray, deleteObjectInArray } from '@/state/utils';

export const initialState: CategoryState = {
  byId: {},
  data: [],
  loading: false,
  status: null,
};

/**
 * Reducer actions for Categorys.
 * @param {CategoryState} state the initial state.
 * @param {Action<TypeConstant> & PayloadAction<TypeConstant, any>} action the action and state params to set.
 */
export const categoryReducer = (
  state: CategoryState = initialState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, any>,
): CategoryState => {
  switch (action.type) {
    case CategoryActionTypes.FETCH.START:
    case CategoryActionTypes.FETCH_BY_ID.START:
    case CategoryActionTypes.CREATE.START:
    case CategoryActionTypes.UPDATE.START:
    case CategoryActionTypes.DELETE.START: {
      return { ...state, loading: true, status: null };
    }
    case CategoryActionTypes.FETCH.SUCCESS: {
      return { ...initialState, data: action.payload, loading: false, status: null };
    }
    case CategoryActionTypes.FETCH_BY_ID.SUCCESS: {
      return { ...state, byId: action.payload, loading: false, status: null };
    }
    case CategoryActionTypes.CREATE.SUCCESS: {
      return { ...state, data: [...state.data, action.payload], loading: false, status: null };
    }
    case CategoryActionTypes.UPDATE.SUCCESS: {
      return {
        ...state,
        byId: action.payload,
        data: updateObjectInArray<CategoryEntity>(state.data, action),
        loading: false,
        status: null,
      };
    }
    case CategoryActionTypes.DELETE.SUCCESS: {
      return {
        ...state,
        data: deleteObjectInArray<CategoryEntity>(state.data, action),
        loading: false,
        status: null,
      };
    }
    case CategoryActionTypes.SET: {
      return { ...initialState, byId: action.payload, loading: false, status: null };
    }
    case CategoryActionTypes.FETCH.ERROR:
    case CategoryActionTypes.FETCH_BY_ID.ERROR:
    case CategoryActionTypes.CREATE.ERROR:
    case CategoryActionTypes.UPDATE.ERROR:
    case CategoryActionTypes.DELETE.ERROR: {
      return {
        ...state,
        loading: false,
        status: action.payload,
      };
    }
    case CategoryActionTypes.CLEAR:
      return {
        ...state,
        loading: false,
        status: null,
      };
    default:
      return state;
  }
};
