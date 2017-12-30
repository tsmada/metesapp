/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_LISTINGS } from 'containers/App/constants';
import { listingsLoaded, listingsLoadedError } from 'containers/App/actions';
import { detailLoaded, detailLoadedError } from 'containers/App/actions';

import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* getListings() {
  const requestURL = `http://serouslabs.com:8000/api/foreclosures`;

  try {
    // Call our request helper (see 'utils/request')
    const listings = yield call(request, requestURL);
    yield put(listingsLoaded(listings));
  } catch (err) {
    yield put(listingsLoadedError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* listingData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_LISTINGS, getListings);
}
