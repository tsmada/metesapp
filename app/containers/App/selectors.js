/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectItemID = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('itemid')
);

const makeSelectRowsPerPage = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['listingTableData','rowsPerPage'])
);

const makeSelectPageNumber = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['listingTableData','page'])
);

const makeSelectChangeSortOrder = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['listingTableData','orderBy'])
  );

const makeSelectChangeSortDirection = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['listingTableData','order'])
  );

const makeSelectSelected = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['listingTableData','selected'])
);

const makeSelectItemDetail = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('item')
);

const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'username'])
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectTableState = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('listingTableData')
);

const makeSelectListings = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['listingTableData', 'data'])
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

export {
  selectGlobal,
  makeSelectItemID,
  makeSelectSelected,
  makeSelectItemDetail,
  makeSelectChangeSortOrder,
  makeSelectCurrentUser,
  makeSelectChangeSortDirection,
  makeSelectRowsPerPage,
  makeSelectPageNumber,
  makeSelectTableState,
  makeSelectLoading,
  makeSelectError,
  makeSelectListings,
  makeSelectLocation,
};
