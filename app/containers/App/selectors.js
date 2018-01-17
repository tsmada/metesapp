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

const makeSelectSearchString = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('herosearch')
);

const makeSelectUserPools = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData','pools'])
);

const makeSelectRowCount = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['listingTableData','rowCount'])
);

const makeSelectHiddenItems = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData','hiddenListings'])
);

const makeSelectPools = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('poolData')
);

const makeSelectName = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData','name'])
);

const makeSelectFilteredItems = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData','filteredListings'])
);

const makeSelectForeclosureMarkers = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['mapData','foreclosureMarkers'])
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

const makeSelectIsLoggedIn = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'isLoggedIn'])
);

const makeSelectTableFilter = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['listingTableData', 'filter'])
);

const makeSelectTableFilterBy = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['listingTableData', 'filterBy'])
);

const makeSelectMessage = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'message'])
);

const makeSelectToken = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'token'])
);

const makeSelectDownload = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'reportData'])
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

const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectGlobal,
  makeSelectItemID,
  makeSelectSelected,
  makeSelectItemDetail,
  makeSelectChangeSortOrder,
  makeSelectCurrentUser,
  makeSelectLocationState,
  makeSelectSearchString,
  makeSelectFilteredItems,
  makeSelectHiddenItems,
  makeSelectUserPools,
  makeSelectRowCount,
  makeSelectName,
  makeSelectTableFilter,
  makeSelectPools,
  makeSelectTableFilterBy,
  makeSelectChangeSortDirection,
  makeSelectRowsPerPage,
  makeSelectPageNumber,
  makeSelectDownload,
  makeSelectForeclosureMarkers,
  makeSelectToken,
  makeSelectMessage,
  makeSelectTableState,
  makeSelectIsLoggedIn,
  makeSelectLoading,
  makeSelectError,
  makeSelectListings,
  makeSelectLocation,
};
