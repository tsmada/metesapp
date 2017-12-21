/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentUser')
);

const makeSelectItemID = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('itemid')
);

const makeSelectItemDetail = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('item')
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectRepos = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'repositories'])
);

const makeSelectListings = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['listings'])
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectItemID,
  makeSelectItemDetail,
  makeSelectLoading,
  makeSelectError,
  makeSelectListings,
  makeSelectRepos,
  makeSelectLocation,
};
