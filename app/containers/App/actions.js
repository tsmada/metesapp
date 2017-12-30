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
} from './constants';

export function handleSelectItem(selected){
  return {
    type: SELECT_ITEM,
    selected,
  }
}

export function handleSelectAllClick(event, selected){
  return {
    type: SELECT_ALL_ITEMS,
    selected,
  }
}

export function handleRequestSort(orderBy, order, data){
  return {
    type: CHANGE_SORT_ORDER,
    orderBy,
    order,
    data,
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
