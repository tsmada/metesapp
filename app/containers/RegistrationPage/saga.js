/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { REGISTER_ACCOUNT, REGISTER_ACCOUNT_FAILURE, REGISTER_ACCOUNT_SUCCESS } from 'containers/App/constants';
import { handleRegisterAccount, handleRegisterAccountSuccess, handleRegisterAccountFailure,
handleUserLogin } from 'containers/App/actions';

import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* submitRegister(action) {
  const requestURL = `https://serouslabs.com:8000/api/register`;

    const result = yield call(request, requestURL,
      {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: action.username,
    password: action.password,
    name: action.name,
  })});
    if (result.success === true){ // should use response codes instead
    yield put(handleRegisterAccountSuccess(action.username, result.message));
    yield put(handleUserLogin(action.username, action.password));
  } else {
    yield put(handleRegisterAccountFailure(action.username, result.message));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* registerAccount() {
// watches for USER_LOG_IN actions and submits the details
  yield takeLatest(REGISTER_ACCOUNT, submitRegister);
}
