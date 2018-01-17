/**
 * Gets the markers for the map rendering
 */

import { call, put, select, takeLatest, take } from 'redux-saga/effects';
import { GET_FORECLOSURE_MARKERS } from 'containers/App/constants';
import { handleGetForeclosureMarkersSuccess, handleGetForeclosureMarkersFailure } from 'containers/App/actions';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* getMarkers() {
  const requestURL = `https://serouslabs.com:8000/api/foreclosures/map`;
  try {
    // Call our request helper (see 'utils/request')
    const markers = yield call(request, requestURL);
    yield put(handleGetForeclosureMarkersSuccess(markers));
    //console.log('success')
  } catch (err) {
    yield put(handleGetForeclosureMarkersFailure(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* markerData() {
  const watcher = yield takeLatest(GET_FORECLOSURE_MARKERS, getMarkers);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
markerData,
]