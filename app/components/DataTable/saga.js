/**
 * Gets the listings from the database
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_LISTINGS, DOWNLOAD_ITEM, CHANGE_TABLE_FILTER } from 'containers/App/constants';
import { listingsLoaded, listingsLoadedError,
handleDownloadItemSuccess, handleDownloadItemError,
handleRequestFilter } from 'containers/App/actions';
import { detailLoaded, detailLoadedError } from 'containers/App/actions';
import request from 'utils/request';

/**
 * Listings handler
 */
export function* getListings() {
  const requestURL = `https://serouslabs.com:8000/api/foreclosures`;

  try {
    // Call our request helper (see 'utils/request')
    const listings = yield call(request, requestURL);
    yield put(listingsLoaded(listings));
  } catch (err) {
    yield put(listingsLoadedError(err));
  }
}

export function* downloadItem(action) {
  const requestURL = `https://serouslabs.com:8000/api/export`;
    const result = yield call(request, requestURL,
      {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    selected: action.selected,
  })});
    try{
      console.log(result.result)
    yield put(handleDownloadItemSuccess(result));
  } catch (err) {
    yield put(handleDownloadItemError(err));
  }
}

export function* getFilter(action) {
  const requestURL = `https://serouslabs.com:8000/api/top/${action.filterBy}`;
    const result = yield call(request, requestURL);
    try{
    yield put(handleRequestFilter(result));
  } catch (err) {
    yield put(handleRequestFilter(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* listingData() {


  yield takeLatest(LOAD_LISTINGS, getListings);
  yield takeLatest(DOWNLOAD_ITEM, downloadItem);
}
