import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { all, fork } from 'redux-saga/effects';

import { IApplicationState } from '../interface';

import { auth, authSaga } from './auth';
import { category, categorySaga } from './category';
import { user, userSaga } from './user';
import { product, productSaga } from './product';

const reducers = {
  auth,
  category,
  user,
  product,
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
  yield all([fork(authSaga), fork(categorySaga), fork(userSaga), fork(productSaga)]);
}
