import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { EntityId, TMetaAction, TPayloadMetaAction } from '@/state/interface';
import apiCaller, { multipartApiCaller } from '@/state/utils/apiCaller';

import { AdvertActionTypes, AdvertEntity } from './types';

/**
 * Business logic of the effects.
 */

/**
 * Handle async GET request to API for fetching Adverts.
 * @param {TMetaAction} params action with meta data.
 */
function* handleFetch(params: TMetaAction): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route);
    yield put({ type: AdvertActionTypes.FETCH.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: AdvertActionTypes.FETCH.ERROR,
        payload: message,
      });
    } else {
      yield put({
        type: AdvertActionTypes.FETCH.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}

/**
 * Handle async GET request to API for fetching an Advert by Id.
 * @param {TPayloadMetaAction<EntityId>} params action with payload and meta data.
 */
function* handleFetchById(params: TPayloadMetaAction<EntityId>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route);
    yield put({ type: AdvertActionTypes.FETCH_BY_ID.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: AdvertActionTypes.FETCH_BY_ID.ERROR,
        payload: message,
      });
    } else {
      yield put({
        type: AdvertActionTypes.FETCH_BY_ID.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}

/**
 * Handle async GET request to API for fetching Adverts by UserId.
 * @param {TPayloadMetaAction<EntityId>} params action with payload and meta data.
 */
function* handleFetchByUser(params: TPayloadMetaAction<EntityId>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route);
    yield put({ type: AdvertActionTypes.FETCH_BY_USER.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: AdvertActionTypes.FETCH_BY_USER.ERROR,
        payload: message,
      });
    } else {
      yield put({
        type: AdvertActionTypes.FETCH_BY_USER.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}

/**
 * Handle async POST request to API for creating a new Advert.
 * @param {TPayloadMetaAction<AdvertEntity>} params action with payload and meta data.
 */
function* handleCreate(params: TPayloadMetaAction<AdvertEntity>): Generator {
  try {
    const ad: AdvertEntity = { ...params.payload, active: true };
    const data = yield call(multipartApiCaller, params.meta.method, params.meta.route, ad);
    yield put({ type: AdvertActionTypes.CREATE.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: AdvertActionTypes.CREATE.ERROR,
        payload: message,
      });
    } else {
      yield put({
        type: AdvertActionTypes.CREATE.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}

/**
 * Handle async PUT request to API for updating a Advert.
 * @param {TPayloadMetaAction<AdvertEntity>} params action with payload and meta data.
 */
function* handleUpdate(params: TPayloadMetaAction<AdvertEntity>): Generator {
  try {
    const data = yield call(multipartApiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: AdvertActionTypes.UPDATE.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: AdvertActionTypes.UPDATE.ERROR,
        payload: message,
      });
    } else {
      yield put({
        type: AdvertActionTypes.UPDATE.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}

/**
 * Handle async DELETE request to API for deleting a Advert.
 * @param {TPayloadMetaAction<AdvertEntity>} params action with payload and meta data.
 */
function* handleDelete(params: TPayloadMetaAction<AdvertEntity>): Generator {
  try {
    yield call(apiCaller, params.meta.method, params.meta.route, [], false);
    yield put({ type: AdvertActionTypes.DELETE.SUCCESS, payload: params.payload });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: AdvertActionTypes.DELETE.ERROR,
        payload: message,
      });
    } else {
      yield put({
        type: AdvertActionTypes.DELETE.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}

/**
 * Watches every specified action and runs effect method and passes action args to it.
 */
function* watchFetchRequest(): Generator {
  yield takeEvery(AdvertActionTypes.FETCH.START, handleFetch);
}

function* watchFetchByIdRequest(): Generator {
  yield takeEvery(AdvertActionTypes.FETCH_BY_ID.START, handleFetchById);
}

function* watchFetchByUserRequest(): Generator {
  yield takeEvery(AdvertActionTypes.FETCH_BY_USER.START, handleFetchByUser);
}

function* watchCreateRequest(): Generator {
  yield takeEvery(AdvertActionTypes.CREATE.START, handleCreate);
}

function* watchUpdateRequest(): Generator {
  yield takeEvery(AdvertActionTypes.UPDATE.START, handleUpdate);
}

function* watchDeleteRequest(): Generator {
  yield takeEvery(AdvertActionTypes.DELETE.START, handleDelete);
}

/**
 * saga init, forks in effects.
 */
export default function* advertSaga() {
  yield all([
    fork(watchFetchRequest),
    fork(watchFetchByIdRequest),
    fork(watchFetchByUserRequest),
    fork(watchCreateRequest),
    fork(watchUpdateRequest),
    fork(watchDeleteRequest),
  ]);
}
