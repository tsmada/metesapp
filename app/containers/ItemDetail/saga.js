import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_DETAIL, LOAD_DETAIL_SUCCESS } from 'containers/App/constants';
import { detailLoaded, detailLoadedError } from 'containers/App/actions';

import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* getDetail(item) {
  const requestURL = `https://serouslabs.com:8000/api/foreclosures/id/${item.itemid}`;

  try {
    // Call our request helper (see 'utils/request')
    const item = yield call(request, requestURL);
    yield put(detailLoaded(item));
  } catch (err) {
    yield put(detailLoadedError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* detailData() {
  // Watches for LOAD_DETAIL actions and calls getDetail when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_DETAIL, getDetail);
}


export default [
  detailData,
];