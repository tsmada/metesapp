import { makeSelectCurrentUser, makeSelectIsLoggedIn, makeSelectMessage } from 'containers/App/selectors';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';

import React from 'react';

const locationHelper = locationHelperBuilder({})
export const NotAuthenticated = connectedRouterRedirect({
   // The url to redirect user to if they fail
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/dash',
   // If selector is true, wrapper will not redirect
   // For example let's check that state contains user data
  allowRedirectBack: false,
  authenticatedSelector: () => makeSelectCurrentUser().length > 0,
  // A nice display name for this check
  wrapperDisplayName: 'UserIsNotAuthenticated'
})

export const Authenticated = connectedRouterRedirect({
   // The url to redirect user to if they fail
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/login',
   // If selector is true, wrapper will not redirect
   // For example let's check that state contains user data
  authenticatedSelector: makeSelectCurrentUser(),
  // A nice display name for this check
  wrapperDisplayName: 'UserIsAuthenticated'
})



const LoadingSpinner = (props) => {return (<div>Logging in...</div>);}