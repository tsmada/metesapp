import { makeSelectCurrentUser, makeSelectIsLoggedIn, makeSelectMessage } from 'containers/App/selectors';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'

import React from 'react';

export const Authenticated = connectedRouterRedirect({
   // The url to redirect user to if they fail
  redirectPath: '/login',
   // If selector is true, wrapper will not redirect
   // For example let's check that state contains user data
  authenticatedSelector: makeSelectIsLoggedIn(),
  // A nice display name for this check
  wrapperDisplayName: 'UserIsAuthenticated'
})

export const NotAuthenticated = connectedRouterRedirect({
   // The url to redirect user to if they fail
  redirectPath: '/dash',
   // If selector is true, wrapper will not redirect
   // For example let's check that state contains user data
  authenticatedSelector: username => username,
  // A nice display name for this check
  wrapperDisplayName: 'UserIsAuthenticated'
})



const LoadingSpinner = (props) => {return (<div>Logging in...</div>);}