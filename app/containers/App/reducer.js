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
  DOWNLOAD_ITEM_SUCCESS,
  CHANGE_TABLE_FILTER,
  HIDE_SELECTED_ITEMS,
  SHOW_HIDDEN_ITEMS,
  HERO_SEARCH_SUBMIT,
  GET_USER_POOLS_SUCCESS,
  GET_USER_POOLS_FAILURE,
  HERO_SEARCH_SUBMIT_SUCCESS,
  CHANGE_HERO_SEARCH_STRING,
  CHANGE_ROW_COUNT,
  GET_FILTERED_ITEMS,
  DOWNLOAD_ITEM_COMPLETE,
  CLEAR_CURRENT_FORECLOSURE_MARKERS,
  GET_FORECLOSURE_MARKERS,
  GET_FORECLOSURE_MARKERS_SUCCESS,
  GET_FORECLOSURE_MARKERS_FAILURE,
  USER_LOG_IN,
  USER_LOG_OUT,
  USER_LOG_OUT_SUCCESS,
  USER_LOG_OUT_FAILURE,
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
  LOAD_POOLS_SUCCESS,
  LOAD_POOLS_FAILURE,
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
  poolData: {},
  herosearch: 'Address, City, State, Neighborhood',
  listingTableData: {
    order: 'asc',
    orderBy: 'fcl_id',
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 5,
    rowCount: 0,
    filterBy: 'saledate',
    filter: false,
  },
  userData: {
    username: null,
    name: null,
    isLoggedIn: false,
    isAdmin: false,
    message: false,
    token: false,
    reportData: false,
    watchedListings: [],
    hiddenListings: [],
    filteredListings: [],
    pools: {},
  },
  mapData: {
    foreclosureMarkers: [],
  }
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_POOLS_SUCCESS:
    return state
        .setIn(['userData','pools'], action.pools)
    case GET_USER_POOLS_FAILURE:
    return state
        .setIn(['userData','pools'], {})
    case HIDE_SELECTED_ITEMS:
    return state
        .setIn(['userData','hiddenListings'], action.items)
        .setIn(['listingTableData', 'selected'], [])
    case SHOW_HIDDEN_ITEMS:
    return state
        .setIn(['userData','hiddenListings'], [])
    case CLEAR_CURRENT_FORECLOSURE_MARKERS:
    return state
        .setIn(['mapData','foreclosureMarkers'], [])
    case HERO_SEARCH_SUBMIT_SUCCESS:
    return state
        .setIn(['mapData','foreclosureMarkers'], action.markers)
    case CHANGE_HERO_SEARCH_STRING:
    return state
        .set('herosearch', action.searchstring)
    case GET_FORECLOSURE_MARKERS_SUCCESS:
    return state
        .setIn(['mapData','foreclosureMarkers'], action.markers)
    case GET_FORECLOSURE_MARKERS_FAILURE:
    return state
        .setIn(['mapData','foreclosureMarkers'], false)
    case USER_LOG_OUT:
    return state
        .setIn(['userData','isLoggedIn'], false)
        .setIn(['userData', 'message'], 'Logout Successful.')
        .setIn(['userData','username'], null)
        .setIn(['userData','token'], false)
        .setIn(['userData','name'], false)
    case DOWNLOAD_ITEM_SUCCESS:
    return state
        .setIn(['userData','reportData'], action.report)
    case DOWNLOAD_ITEM_COMPLETE:
    return state
        .setIn(['userData','reportData'], false)
    case REGISTER_ACCOUNT_FAILURE:
    return state
        .setIn(['userData','username'], action.username)
        .setIn(['userData', 'isLoggedIn'], false)
        .setIn(['userData', 'message'], action.message)
    case REGISTER_ACCOUNT_SUCCESS:
    return state
        .setIn(['userData','username'], action.username)
        .setIn(['userData','name'], action.name)
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
    case CHANGE_TABLE_FILTER:
    return state
        .setIn(['userData', 'filteredListings'], action.data)
        .setIn(['listingTableData', 'filter'], action.filter)
        .setIn(['listingTableData', 'filterBy'], action.filterBy)
    case CHANGE_SORT_ORDER:
    return state
        .setIn(['listingTableData','data'], action.data)
        .setIn(['listingTableData', 'order'], action.order)
        .setIn(['listingTableData', 'orderBy'], action.orderBy)
    case CHANGE_PAGE:
    return state
        .setIn(['listingTableData','page'], action.page)
    case CHANGE_ROW_COUNT:
    return state
        .setIn(['listingTableData','rowCount'], action.rowCount)
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
    case LOAD_POOLS_SUCCESS:
      return state
        .set('poolData', action.pools)
    case LOAD_POOLS_FAILURE:
      return state
        .set('poolData', {})
    case LOAD_LISTINGS_SUCCESS:
      return state
        .setIn(['listingTableData', 'data'], action.listings)
        .setIn(['listingTableData', 'rowCount'], action.listings.length)
    case LOAD_LISTINGS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
