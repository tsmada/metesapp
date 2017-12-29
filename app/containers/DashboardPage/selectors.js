/**
 * DashboardPage selectors
 */

import { createSelector } from 'reselect';

const selectDashboard = (state) => state.get('global');

const makeSelectListings = () => createSelector(
  selectDashboard,
  (globalState) => globalState.getIn(['listingTableData','data'])
);

export {
  selectDashboard,
  makeSelectListings,
};