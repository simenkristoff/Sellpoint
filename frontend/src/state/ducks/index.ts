import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { all, fork } from 'redux-saga/effects';

import { IApplicationState } from '../interface';

import { auth, authSaga } from './auth';

const reducers = {
  auth,
};

export const rootReducer = combineReducers<IApplicationState>({
  ...reducers,
});

export const configStorage = {
  key: 'root',
  storage,
  whitelist: [],
};

export const persistentReducer = persistReducer(configStorage, rootReducer);

export function* rootSaga() {
  yield all([fork(authSaga)]);
}
