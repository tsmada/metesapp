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
export const USER_LOGGING_IN = 'boilerplate/App/USER_LOGGING_IN';
export const USER_LOGGED_IN = 'boilerplate/App/USER_LOGGED_IN';
export const USER_LOGGED_OUT = 'boilerplate/App/USER_LOGGED_OUT';
export const USER_LOGIN_FAILURE = 'boilerplate/App/USER_LOGGED_OUT';
export const DEFAULT_LOCALE = 'en';
