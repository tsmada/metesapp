/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { USER_ACCOUNT_DELETE } from 'containers/App/constants';
import { handleUserAccountDelete, handleUserAccountDeleteSuccess,
handleUserAccountDeleteFailure,
 } from 'containers/App/actions';
import { push } from 'react-router-redux';
import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* submitDelete(action) {
  const requestURL = `https://serouslabs.com:8000/api/user/delete`;
  console.log(requestURL);

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
    yield put(handleUserAccountDeleteSuccess(action.username, action.password));
    yield put(push('/login'));
  } else {
    yield put(handleUserAccountDeleteFailure(action.username, result.message));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* userDelete() {
// watches for USER_LOG_IN actions and submits the details
  yield takeLatest(USER_ACCOUNT_DELETE, submitDelete);
}


export default [
  userDelete,
];