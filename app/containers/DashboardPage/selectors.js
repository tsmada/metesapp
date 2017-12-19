/**
 * DashboardPage selectors
 */

import { createSelector } from 'reselect';

const selectDashboard = (state) => state.get('dashboardPage');

const makeSelectListings = () => createSelector(
  selectDashboard,
  (dashboardState) => dashboardState.get('listings')
);

export {
  selectDashboard,
  makeSelectListings,
};