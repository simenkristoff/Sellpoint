import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { all, fork } from 'redux-saga/effects';

import { IApplicationState } from '../interface';

import { auth, authSaga } from './auth';
import { user, userSaga } from './user';
import { product, productSaga } from './product';
import { advert, advertSaga } from './advert';

const reducers = {
  auth,
  user,
  product,
  advert,
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
  yield all([fork(authSaga), fork(userSaga), fork(productSaga), fork(advertSaga)]);
}
