// analytics-sagas.js
import { takeEvery, call } from 'redux-saga/effects';

export function* gaAnalytics() {
  console.log('test');
  //yield call(window.ga, 'send', 'pageview');
  
}


function* watchLocationChange() {
  yield takeEvery('LOCATION_CHANGE', gaAnalytics)
}