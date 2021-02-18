import { Action, TypeConstant, PayloadAction } from 'typesafe-actions';

import { UserActionTypes, UserState } from './types';

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
    case UserActionTypes.FETCH_ONE.START: {
      return { ...state, loading: true, status: null };
    }
    case UserActionTypes.FETCH.SUCCESS: {
      return { ...state, data: action.payload, loading: false, status: null };
    }
    case UserActionTypes.FETCH_ONE.SUCCESS: {
      return { ...state, byId: action.payload, loading: false, status: null };
    }
    case UserActionTypes.SET: {
      return { ...initialState, byId: action.payload, loading: false, status: null };
    }
    case UserActionTypes.FETCH.ERROR:
    case UserActionTypes.FETCH_ONE.ERROR: {
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
