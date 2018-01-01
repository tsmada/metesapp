/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { USER_LOG_IN, USER_LOG_IN_SUCCESS } from 'containers/App/constants';
import { handleUserLogin, handleUserLoginSuccess, handleUserLoginFailure } from 'containers/App/actions';

import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* submitLogin(action) {
  const requestURL = `https://serouslabs.com:8000/api/auth`;

    const result = yield call(request, requestURL,
      {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: action.username,
    password: action.password,
  })});
    if (result.success === true){
    yield put(handleUserLoginSuccess(action.username));
  } else {
    yield put(handleUserLoginFailure());
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* userLogin() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(USER_LOG_IN, submitLogin);
}
