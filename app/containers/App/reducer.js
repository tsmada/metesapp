/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  SET_SELECTED_ITEM,
  LOAD_DETAIL,
  LOAD_DETAIL_SUCCESS,
  LOAD_DETAIL_ERROR,
  LOAD_LISTINGS_SUCCESS,
  LOAD_LISTINGS_ERROR,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  itemid: [],
  item: [],
  listings: [],
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_ITEM:
      return state
        .setIn(['itemid'], action.itemid);
    case LOAD_DETAIL:
      return state
        .setIn(['itemid'], action.itemid);
    case LOAD_DETAIL_SUCCESS:
      return state
        .setIn(['item'], action.item)
    case LOAD_DETAIL_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case LOAD_LISTINGS_SUCCESS:
      return state
        .setIn(['listings'], action.listings)
    case LOAD_LISTINGS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false);
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(['userData', 'repositories'], action.repos)
        .set('loading', false)
        .set('currentUser', action.username);
    case LOAD_REPOS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
