import { UserAuthWrapper } from 'redux-auth-wrapper'
import { makeSelectCurrentUser, makeSelectIsLoggedIn, makeSelectMessage } from 'containers/App/selectors';

// Redirects to /login by default
export const UserIsAuthenticated = UserAuthWrapper({
  authSelector: makeSelectCurrentUser(), // how to get the user state
  redirectAction: 'LOCATION_CHANGE', // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
});