import { action } from 'typesafe-actions';

import { ApiResponse } from '@/state/interface';
import { UserActionTypes } from '../types';

import { userReducer, initialState } from '../reducer';

import userData from './__mockData__/userData';

describe('user reducer', () => {
  it('should equal initial state', () => {
    expect(userReducer(initialState, { type: 'no type', payload: [] })).toEqual(initialState);
  });
  it('should update loading and status on all START', () => {
    expect(userReducer(initialState, { type: UserActionTypes.FETCH.START, payload: [] })).toEqual({
      ...initialState,
      loading: true,
      status: null,
    });
    expect(userReducer(initialState, { type: UserActionTypes.FETCH_ONE.START, payload: [] })).toEqual({
      ...initialState,
      loading: true,
      status: null,
    });
  });
  it('should set data on FETCH.SUCCESS', () => {
    expect(userReducer(initialState, action(UserActionTypes.FETCH.SUCCESS, userData))).toEqual({
      ...initialState,
      data: userData,
      loading: false,
    });
  });
  it('should set byId on FETCH_ONE.SUCCESS', () => {
    expect(userReducer(initialState, action(UserActionTypes.FETCH_ONE.SUCCESS, userData[0]))).toEqual({
      ...initialState,
      byId: userData[0],
      loading: false,
    });
  });
  it('should set byId on SET.START', () => {
    expect(userReducer(initialState, action(UserActionTypes.SET, userData[0]))).toEqual({
      ...initialState,
      byId: userData[0],
    });
  });

  it('should clear byId', () => {
    const currentState = { ...initialState, byId: userData[0] };
    expect(userReducer(currentState, action(UserActionTypes.SET, {}))).toEqual({
      ...initialState,
    });
  });
  it('should set status on all ERROR', () => {
    const state = { ...initialState, loading: true };
    const expectedState = { ...initialState, loading: false, status: 'An error occured' };
    expect(userReducer(state, { type: UserActionTypes.FETCH.ERROR, payload: 'An error occured' })).toEqual({ ...expectedState });
    expect(userReducer(state, { type: UserActionTypes.FETCH_ONE.ERROR, payload: 'An error occured' })).toEqual({ ...expectedState });
  });
  it('should clear user state', () => {
    const state = { ...initialState, status: 'An error occured' };
    expect(
      userReducer(state, {
        type: UserActionTypes.CLEAR,
        payload: [],
      }),
    ).toEqual({
      ...initialState,
    });
  });
});
