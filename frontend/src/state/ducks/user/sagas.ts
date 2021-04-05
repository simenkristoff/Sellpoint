import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { UserActionTypes, UserEntity } from './types';
import apiCaller from '@/state/utils/apiCaller';

import { EntityId, TMetaAction, TPayloadMetaAction } from '@/state/interface';

/**
 * @desc Business logic of the effects.
 */

/**
 * Handle async GET request to API for fetching Users.
 * @param {TMetaAction} params action with meta data.
 */
function* handleFetch(params: TMetaAction): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route);
    yield put({ type: UserActionTypes.FETCH.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: UserActionTypes.FETCH.ERROR,
        payload: message,
      });
    } else {
      yield put({
        type: UserActionTypes.FETCH.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}
/**
 * Handle async PUT request to API for updating a User
 * @param {TPayloadMetaAction<ProductEntity>} params action with payload and meta data.
 */
function* handleUpdate(params: TPayloadMetaAction<UserEntity>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: UserActionTypes.UPDATE.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: UserActionTypes.UPDATE.ERROR,
        payload: message,
      });
    } else {
      yield put({
        type: UserActionTypes.UPDATE.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}

/**
 * Handle async GET request to API for fetching an User by Id.
 * @param {TPayloadMetaAction<EntityId>} params action with payload and meta data.
 */
function* handleFetchById(params: TPayloadMetaAction<EntityId>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route);
    yield put({ type: UserActionTypes.FETCH_BY_ID.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: UserActionTypes.FETCH_BY_ID.ERROR,
        payload: message,
      });
    } else {
      yield put({
        type: UserActionTypes.FETCH_BY_ID.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}

function* handleDelete(params: TPayloadMetaAction<UserEntity>): Generator {
  try {
    yield call(apiCaller, params.meta.method, params.meta.route, [], false);
    yield put({ type: UserActionTypes.DELETE.SUCCESS, payload: params.payload });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: UserActionTypes.DELETE.ERROR,
        payload: message,
      });
    } else {
      yield put({
        type: UserActionTypes.DELETE.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}

/**
 * @desc Watches every specified action and runs effect method and passes action args to it.
 */
function* watchFetchRequest(): Generator {
  yield takeEvery(UserActionTypes.FETCH.START, handleFetch);
}

function* watchFetchByIdRequest(): Generator {
  yield takeEvery(UserActionTypes.FETCH_BY_ID.START, handleFetchById);
}

function* watchDeleteRequest(): Generator {
  yield takeEvery(UserActionTypes.DELETE.START, handleDelete);
}

function* watchUpdateRequest(): Generator {
  yield takeEvery(UserActionTypes.UPDATE.START, handleUpdate);
}

/**
 * @desc saga init, forks in effects.
 */
export default function* userSaga() {
  yield all([fork(watchFetchRequest), fork(watchFetchByIdRequest), fork(watchDeleteRequest), fork(watchUpdateRequest)]);
}
