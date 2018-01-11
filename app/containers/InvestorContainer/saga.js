/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { GET_USER_POOLS } from 'containers/App/constants';
import { handleGetUserPoolsSuccess, handleGetUserPoolsFailure } from 'containers/App/actions';

import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* getPools(action) {
  const requestURL = `https://serouslabs.com:8000/api/pool/${action.username}`;
  console.log(action.username);
    const result = yield call(request, requestURL);
    try{
    yield put(handleGetUserPoolsSuccess(result));
  } catch (err) {
    yield put(handleGetUserPoolsFailure(err));
  }
}


/**
 * Root saga manages watcher lifecycle
 */
export default function* userPoolData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(GET_USER_POOLS, getPools);
}
