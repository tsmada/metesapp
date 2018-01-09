/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const SELECT_ALL_ITEMS = 'boilerplate/App/SELECT_ALL_ITEMS';
export const SELECT_ITEM = 'boilerplate/App/SELECT_ITEM';
export const SELECT_USER = 'boilerplate/App/SELECT_USER';
export const UNSELECT_ALL_ITEMS = 'boilerplate/App/UNSELECT_ALL_ITEMS';
export const HIDE_SELECTED_ITEMS = 'boilerplate/App/HIDE_SELECTED_ITEMS';
export const SHOW_HIDDEN_ITEMS = 'boilerplate/App/SHOW_HIDDEN_ITEMS';
export const HERO_SEARCH_SUBMIT = 'boilerplate/App/HERO_SEARCH_SUBMIT';
export const HERO_SEARCH_SUBMIT_SUCCESS = 'boilerplate/App/HERO_SEARCH_SUBMIT_SUCCESS';
export const HERO_SEARCH_SUBMIT_FAILURE = 'boilerplate/App/HERO_SEARCH_SUBMIT_FAILURE';
export const CHANGE_HERO_SEARCH_STRING = 'boilerplate/App/CHANGE_HERO_SEARCH_STRING';
export const CHANGE_SORT_ORDER = 'boilerplate/App/CHANGE_SORT_ORDER';
export const GET_FILTERED_ITEMS = 'boilerplate/App/GET_FILTERED_ITEMS';
export const CHANGE_ROW_COUNT = 'boilerplate/App/CHANGE_ROW_COUNT';
export const CHANGE_TABLE_FILTER = 'boilerplate/APP/CHANGE_TABLE_FILTER';
export const CHANGE_SORT_BY = 'boilerplate/App/CHANGE_SORT_BY';
export const CHANGE_PAGE = 'boilerplate/App/CHANGE_PAGE';
export const CHANGE_ROWS_PER_PAGE = 'boilerplate/App/CHANGE_ROWS_PER_PAGE';
export const GET_FORECLOSURE_MARKERS = 'boilerplate/App/GET_FORECLOSURE_MARKERS';
export const CLEAR_CURRENT_FORECLOSURE_MARKERS = 'boilerplate/App/CLEAR_CURRENT_FORECLOSURE_MARKERS';
export const GET_FORECLOSURE_MARKERS_SUCCESS = 'boilerplate/App/GET_FORECLOSURE_MARKERS_SUCCESS';
export const GET_FORECLOSURE_MARKERS_FAILURE = 'boilerplate/App/GET_FORECLOSURE_MARKERS_FAILURE';
export const LOAD_DETAIL = 'boilerplate/App/LOAD_DETAIL';
export const LOAD_DETAIL_SUCCESS = 'boilerplate/App/LOAD_DETAIL_SUCCESS';
export const LOAD_DETAIL_ERROR = 'boilerplate/App/LOAD_DETAIL_ERROR';
export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_LISTINGS = 'boilerplate/App/LOAD_LISTINGS';
export const LOAD_LISTINGS_SUCCESS = 'boilerplate/App/LOAD_LISTINGS_SUCCESS';
export const LOAD_LISTINGS_ERROR = 'boilerplate/App/LOAD_LISTINGS_ERROR';
export const USER_LOG_IN = 'boilerplate/App/USER_LOG_IN';
export const USER_LOG_IN_SUCCESS = 'boilerplate/App/USER_LOG_IN_SUCCESS';
export const USER_LOG_IN_FAILURE = 'boilerplate/App/USER_LOG_IN_FAILURE';
export const USER_LOG_OUT = 'boilerplate/App/USER_LOG_OUT';
export const USER_LOG_OUT_SUCCESS = 'boilerplate/App/USER_LOG_OUT_SUCCESS';
export const USER_LOG_OUT_FAILURE = 'boilerplate/App/USER_LOG_OUT_FAILURE';
export const DOWNLOAD_ITEM = 'boilerplate/App/DOWNLOAD_ITEM';
export const DOWNLOAD_ITEM_SUCCESS = 'boilerplate/App/DOWNLOAD_ITEM_SUCCESS';
export const DOWNLOAD_ITEM_FAILURE = 'boilerplate/App/DOWNLOAD_ITEM_FAILURE';
export const DOWNLOAD_ITEM_COMPLETE = 'boilerplate/App/DOWNLOAD_ITEM_COMPLETE';
export const REGISTER_ACCOUNT = 'boilerplate/App/REGISTER_ACCOUNT';
export const REGISTER_ACCOUNT_SUCCESS = 'boilerplate/App/REGISTER_ACCOUNT_SUCCESS';
export const REGISTER_ACCOUNT_FAILURE = 'boilerplate/App/REGISTER_ACCOUNT_FAILURE';
export const DEFAULT_LOCALE = 'en';
