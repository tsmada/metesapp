/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  SELECT_ALL_ITEMS,
  SELECT_ITEM,
  SELECT_USER,
  USER_LOG_IN,
  USER_LOG_OUT,
  CHANGE_TABLE_FILTER,
  GET_FORECLOSURE_MARKERS,
  GET_FORECLOSURE_MARKERS_SUCCESS,
  GET_FORECLOSURE_MARKERS_FAILURE,
  DOWNLOAD_ITEM,
  DOWNLOAD_ITEM_SUCCESS,
  DOWNLOAD_ITEM_FAILURE,
  DOWNLOAD_ITEM_COMPLETE,
  USER_LOG_IN_SUCCESS,
  USER_LOG_IN_FAILURE,
  UNSELECT_ALL_ITEMS,
  CHANGE_SORT_ORDER,
  CHANGE_SORT_BY,
  CHANGE_PAGE,
  CHANGE_ROWS_PER_PAGE,
  LOAD_DETAIL,
  LOAD_DETAIL_SUCCESS,
  LOAD_DETAIL_ERROR,
  LOAD_LISTINGS,
  LOAD_LISTINGS_SUCCESS,
  LOAD_LISTINGS_ERROR,
  REGISTER_ACCOUNT,
  REGISTER_ACCOUNT_SUCCESS,
  REGISTER_ACCOUNT_FAILURE,
} from './constants';


export function handleRegisterAccountSuccess(username, message){
  return {
    type: REGISTER_ACCOUNT_SUCCESS,
    username,
    message,
  }
}

export function handleRegisterAccountFailure(username, message){
  return {
    type: REGISTER_ACCOUNT_FAILURE,
    username,
    message,
  }
}

export function handleRegisterAccount(username, password){
  return {
    type: REGISTER_ACCOUNT,
    username,
    password,
  }
}

export function handleGetForeclosureMarkers(){
  return {
    type: GET_FORECLOSURE_MARKERS,
  }
}

export function handleGetForeclosureMarkersSuccess(markers){
  return {
    type: GET_FORECLOSURE_MARKERS_SUCCESS,
    markers,
  }
}

export function handleGetForeclosureMarkersFailure(error){
  return {
    type: GET_FORECLOSURE_MARKERS_FAILURE,
    error,
  }
}

export function handleUserLogout(username){
  return {
    type: USER_LOG_OUT,
    username,
  }
}

export function handleUserLogin(username, password){
  return {
    type: USER_LOG_IN,
    username,
    password,
  }
}

export function handleUserLoginSuccess(username, token){
  return {
    type: USER_LOG_IN_SUCCESS,
    username,
    token,
  }
}

export function handleUserLoginFailure(username, message){
  return {
    type: USER_LOG_IN_FAILURE,
    username,
    message,
  }
}


export function handleSelectUser(){
  return {
    type: SELECT_USER,
  }
}

export function handleSelectItem(selected){
  return {
    type: SELECT_ITEM,
    selected,
  }
}

export function handleDownloadItem(selected){
  return {
    type: DOWNLOAD_ITEM,
    selected,
  }
}

export function handleDownloadItemSuccess(report){
  return {
    type: DOWNLOAD_ITEM_SUCCESS,
    report,
  }
}

export function handleDownloadComplete(){
  return {
    type: DOWNLOAD_ITEM_COMPLETE,
  }
}

export function handleDownloadItemError(message){
  return {
    type: DOWNLOAD_ITEM_FAILURE,
    message,
  }
}

export function handleSelectAllClick(selected){
  return {
    type: SELECT_ALL_ITEMS,
    selected,
  }
}

export function handleRequestSort(data, order, orderBy){
  return {
    type: CHANGE_SORT_ORDER,
    data,
    order,
    orderBy,
  }
}

export function handleRequestFilter(data, filter, filterBy){
  return {
    type: CHANGE_TABLE_FILTER,
    data,
    filter,
    filterBy,
  }
}

export function changePage(page) {
  return {
    type: CHANGE_PAGE,
    page,
  }
}

export function changeRowsPerPage(newval) {
  return {
    type: CHANGE_ROWS_PER_PAGE,
    newval,
  };
}

export function selectAllItems(selected) {
  return {
    type: SELECT_ALL_ITEMS,
    selected,
  };
}

export function loadDetail(itemid) {
  return {
    type: LOAD_DETAIL,
    itemid,
  };
}

export function detailLoaded(item) {
  return {
    type: LOAD_DETAIL_SUCCESS,
    item,
  };
}

export function detailLoadedError(error) {
  return {
    type: LOAD_DETAIL_ERROR,
    error,
  };
}

export function register(newuser) {
    return {
        type: REGISTER,
        error,
    };
}

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loadListings() {
  return {
    type: LOAD_LISTINGS,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function listingsLoaded(listings) {
  return {
    type: LOAD_LISTINGS_SUCCESS,
    listings,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function listingsLoadedError(error) {
  return {
    type: LOAD_LISTINGS_ERROR,
    error,
  };
}
