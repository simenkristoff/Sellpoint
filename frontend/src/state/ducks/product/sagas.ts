import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { EntityId, TMetaAction, TPayloadMetaAction } from '@/state/interface';
import apiCaller, { multipartApiCaller } from '@/state/utils/apiCaller';

import { ProductActionTypes, ProductEntity } from './types';

/**
 * Business logic of the effects.
 */

/**
 * Handle async GET request to API for fetching Products.
 * @param {TMetaAction} params action with meta data.
 */
function* handleFetch(params: TMetaAction): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route);
    yield put({ type: ProductActionTypes.FETCH.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: ProductActionTypes.FETCH.ERROR,
        payload: message,
      });
    } else {
      yield put({
        type: ProductActionTypes.FETCH.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}

/**
 * Handle async GET request to API for fetching an Product by Id.
 * @param {TPayloadMetaAction<EntityId>} params action with payload and meta data.
 */
function* handleFetchById(params: TPayloadMetaAction<EntityId>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route);
    yield put({ type: ProductActionTypes.FETCH_BY_ID.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: ProductActionTypes.FETCH_BY_ID.ERROR,
        payload: message,
      });
    } else {
      yield put({
        type: ProductActionTypes.FETCH_BY_ID.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}

/**
 * Handle async POST request to API for creating a new Product.
 * @param {TPayloadMetaAction<ProductEntity>} params action with payload and meta data.
 */
function* handleCreate(params: TPayloadMetaAction<ProductEntity>): Generator {
  try {
    const data = yield call(multipartApiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: ProductActionTypes.CREATE.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: ProductActionTypes.CREATE.ERROR,
        payload: message,
      });
    } else {
      yield put({
        type: ProductActionTypes.CREATE.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}

/**
 * Handle async PUT request to API for updating a Product.
 * @param {TPayloadMetaAction<ProductEntity>} params action with payload and meta data.
 */
function* handleUpdate(params: TPayloadMetaAction<ProductEntity>): Generator {
  try {
    const data = yield call(multipartApiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: ProductActionTypes.UPDATE.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: ProductActionTypes.UPDATE.ERROR,
        payload: message,
      });
    } else {
      yield put({
        type: ProductActionTypes.UPDATE.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}

/**
 * Handle async DELETE request to API for deleting a Product.
 * @param {TPayloadMetaAction<ProductEntity>} params action with payload and meta data.
 */
function* handleDelete(params: TPayloadMetaAction<ProductEntity>): Generator {
  try {
    yield call(apiCaller, params.meta.method, params.meta.route, [], false);
    yield put({ type: ProductActionTypes.DELETE.SUCCESS, payload: params.payload });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: ProductActionTypes.DELETE.ERROR,
        payload: message,
      });
    } else {
      yield put({
        type: ProductActionTypes.DELETE.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}

/**
 * Watches every specified action and runs effect method and passes action args to it.
 */
function* watchFetchRequest(): Generator {
  yield takeEvery(ProductActionTypes.FETCH.START, handleFetch);
}

function* watchFetchByIdRequest(): Generator {
  yield takeEvery(ProductActionTypes.FETCH_BY_ID.START, handleFetchById);
}

function* watchCreateRequest(): Generator {
  yield takeEvery(ProductActionTypes.CREATE.START, handleCreate);
}

function* watchUpdateRequest(): Generator {
  yield takeEvery(ProductActionTypes.UPDATE.START, handleUpdate);
}

function* watchDeleteRequest(): Generator {
  yield takeEvery(ProductActionTypes.DELETE.START, handleDelete);
}

/**
 * saga init, forks in effects.
 */
export default function* productSaga() {
  yield all([
    fork(watchFetchRequest),
    fork(watchFetchByIdRequest),
    fork(watchCreateRequest),
    fork(watchUpdateRequest),
    fork(watchDeleteRequest),
  ]);
}
