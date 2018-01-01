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
    if (result.success === true){ // should use response codes instead
    yield put(handleUserLoginSuccess(action.username));
  } else {
    yield put(handleUserLoginFailure(action.username));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* userLogin() {
// watches for USER_LOG_IN actions and submits the details
  yield takeLatest(USER_LOG_IN, submitLogin);
}
