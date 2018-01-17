import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { HERO_SEARCH_SUBMIT, HERO_SEARCH_SUBMIT_SUCCESS } from 'containers/App/constants';
import { handleHeroSearchSubmit, handleHeroSearchSubmitSuccess, handleHeroSearchSubmitFailure } from 'containers/App/actions';
import request from 'utils/request';
import { push, LOCATION_CHANGE } from 'react-router-redux';

/**
 * Github repos request/response handler
 */
export function* submitSearch(action, dispatch) {

  const requestURL = `https://serouslabs.com:8000/api/main/` + String(action.searchstring);

    const result = yield call(request, requestURL,
      {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    address: action.searchstring
  })});

    yield put(handleHeroSearchSubmitSuccess(result));
    yield put(push('/map'));
}

/**
 * Root saga manages watcher lifecycle
 */
export function* userSearch() {
// watches for USER_LOG_IN actions and submits the details
  const watcher = yield takeLatest(HERO_SEARCH_SUBMIT, submitSearch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// Bootstrap sagas
export default [
  userSearch,
];