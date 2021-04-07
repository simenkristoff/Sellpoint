import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { EntityId, TMetaAction, TPayloadMetaAction } from '@/state/interface';
import apiCaller from '@/state/utils/apiCaller';

import { CategoryActionTypes, CategoryEntity } from './types';

/**
 * Business logic of the effects.
 */

/**
 * Handle async GET request to API for fetching Categorys.
 * @param {TMetaAction} params action with meta data.
 */
function* handleFetch(params: TMetaAction): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route);
    yield put({ type: CategoryActionTypes.FETCH.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: CategoryActionTypes.FETCH.ERROR,
        payload: message,
      });
    } else {
      yield put({
        type: CategoryActionTypes.FETCH.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}

/**
 * Handle async POST request to API for creating a new Category.
 * @param {TPayloadMetaAction<CategoryEntity>} params action with payload and meta data.
 */
function* handleCreate(params: TPayloadMetaAction<CategoryEntity>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: CategoryActionTypes.CREATE.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: CategoryActionTypes.CREATE.ERROR,
        payload: message,
      });
    } else {
      yield put({
        type: CategoryActionTypes.CREATE.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}

/**
 * Handle async DELETE request to API for deleting a Category.
 * @param {TPayloadMetaAction<CategoryEntity>} params action with payload and meta data.
 */
function* handleDelete(params: TPayloadMetaAction<CategoryEntity>): Generator {
  try {
    yield call(apiCaller, params.meta.method, params.meta.route, [], false);
    yield put({ type: CategoryActionTypes.DELETE.SUCCESS, payload: params.payload });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: CategoryActionTypes.DELETE.ERROR,
        payload: message,
      });
    } else {
      yield put({
        type: CategoryActionTypes.DELETE.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}

/**
 * Watches every specified action and runs effect method and passes action args to it.
 */
function* watchFetchRequest(): Generator {
  yield takeEvery(CategoryActionTypes.FETCH.START, handleFetch);
}

function* watchCreateRequest(): Generator {
  yield takeEvery(CategoryActionTypes.CREATE.START, handleCreate);
}

function* watchDeleteRequest(): Generator {
  yield takeEvery(CategoryActionTypes.DELETE.START, handleDelete);
}

/**
 * saga init, forks in effects.
 */
export default function* categorySaga() {
  yield all([fork(watchFetchRequest), fork(watchCreateRequest), fork(watchDeleteRequest)]);
}
