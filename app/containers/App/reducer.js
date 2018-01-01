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

import { fromJS, Map, List } from 'immutable';

import {
  SET_SELECTED_ITEM,
  SELECT_ITEM,
  USER_LOG_IN,
  USER_LOG_IN_SUCCESS,
  USER_LOG_IN_FAILURE,
  SELECT_USER,
  CHANGE_ROWS_PER_PAGE,
  CHANGE_SORT_ORDER,
  CHANGE_PAGE,
  SELECT_ALL_ITEMS,
  LOAD_DETAIL,
  LOAD_DETAIL_SUCCESS,
  LOAD_DETAIL_ERROR,
  LOAD_LISTINGS_SUCCESS,
  LOAD_LISTINGS_ERROR,
  REGISTER_ACCOUNT,
  REGISTER_ACCOUNT_SUCCESS,
  REGISTER_ACCOUNT_FAILURE,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  itemid: [],
  item: [],
  loading: false,
  error: false,
  listingTableData: {
    order: 'asc',
    orderBy: 'fcl_id',
    selected: List([]),
    data: [],
    page: 0,
    rowsPerPage: 5,
  },
  userData: {
    username: '',
    isLoggedIn: false,
    isAdmin: false,
    message: false,
    token: false,
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_ACCOUNT_FAILURE:
    return state
        .setIn(['userData','username'], action.username)
        .setIn(['userData', 'isLoggedIn'], false)
        .setIn(['userData', 'message'], action.message)
    case REGISTER_ACCOUNT_SUCCESS:
    return state
        .setIn(['userData','username'], action.username)
        .setIn(['userData', 'isLoggedIn'], true)
        .setIn(['userData', 'token'], action.token)
        .setIn(['userData', 'message'], 'Registration Successful')
    case USER_LOG_IN_SUCCESS:
    return state
        .setIn(['userData','username'], action.username)
        .setIn(['userData', 'isLoggedIn'], true)
        .setIn(['userData', 'token'], action.token)
        .setIn(['userData', 'message'], 'Login Successful')
    case USER_LOG_IN_FAILURE:
    return state
        .setIn(['userData','username'], action.username)
        .setIn(['userData', 'isLoggedIn'], false)
        .setIn(['userData', 'message'], action.message)
    case SELECT_USER:
    return state
        .setIn(['userData','username'], action.username)
    case SELECT_ITEM:
    return state
        .setIn(['listingTableData','selected'], action.selected)
    case CHANGE_SORT_ORDER:
    return state
        .setIn(['listingTableData','data'], action.data)
        .setIn(['listingTableData', 'order'], action.order)
        .setIn(['listingTableData', 'orderBy'], action.orderBy)
    case CHANGE_PAGE:
    return state
        .setIn(['listingTableData','page'], action.page)
    case CHANGE_ROWS_PER_PAGE:
    return state
        .setIn(['listingTableData','rowsPerPage'], action.newval)
    case SELECT_ALL_ITEMS:
    return state
        .setIn(['listingTableData','selected'], action.selected)
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
        .setIn(['listingTableData', 'data'], action.listings)
    case LOAD_LISTINGS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
