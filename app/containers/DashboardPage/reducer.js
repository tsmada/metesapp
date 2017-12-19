/*
 *
 * DashboardPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_LISTINGS,
} from 'containers/App/constants';

// The initial state of the App
const initialState = fromJS({
  listings: [],
});

function dashboardPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_LISTINGS:
      return state
        .set('listings', action.listings);
    default:
      return state;
  }
}

export default dashboardPageReducer;
