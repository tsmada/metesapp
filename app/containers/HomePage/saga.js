import { call, put, select, takeLatest } from 'redux-saga/effects';
import { HERO_SEARCH_SUBMIT, HERO_SEARCH_SUBMIT_SUCCESS } from 'containers/App/constants';
import { handleHeroSearchSubmit, handleHeroSearchSubmitSuccess, handleHeroSearchSubmitFailure } from 'containers/App/actions';

import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* submitSearch(action) {

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
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* userSearch() {
// watches for USER_LOG_IN actions and submits the details
  yield takeLatest(HERO_SEARCH_SUBMIT, submitSearch);
}
