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
export const CHANGE_SORT_ORDER = 'boilerplate/App/CHANGE_SORT_ORDER';
export const CHANGE_SORT_BY = 'boilerplate/App/CHANGE_SORT_BY';
export const CHANGE_PAGE = 'boilerplate/App/CHANGE_PAGE';
export const CHANGE_ROWS_PER_PAGE = 'boilerplate/App/CHANGE_ROWS_PER_PAGE';
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
export const REGISTER_ACCOUNT = 'boilerplate/App/REGISTER_ACCOUNT';
export const REGISTER_ACCOUNT_SUCCESS = 'boilerplate/App/REGISTER_ACCOUNT_SUCCESS';
export const REGISTER_ACCOUNT_FAILURE = 'boilerplate/App/REGISTER_ACCOUNT_FAILURE';
export const DEFAULT_LOCALE = 'en';
