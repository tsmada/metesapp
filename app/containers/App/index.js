/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import DashboardPage from 'containers/DashboardPage/Loadable';
import RegistrationPage from 'containers/RegistrationPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import ItemDetail from 'containers/ItemDetail/Loadable';
import DashboardContainer from 'containers/DashboardPage';
import ProfileContainer from 'containers/ProfileContainer';
import MapContainer from 'containers/MapContainer/Loadable';
import InvestorContainer from 'containers/InvestorContainer/Loadable';
import HordeContainer from 'containers/HordeContainer/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { LOCATION_CHANGE } from 'react-router-redux';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { Authenticated, NotAuthenticated } from './authWrapper';

const AppWrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
  overflow: none;
`;


export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - metes.io"
        defaultTitle="metes.io"
      >
        <meta name="description" content="A property listing application" />
      </Helmet>

      <Switch>
        <Route exact path="/" component={HomePage} />
          <Route exact path="/dash" component={Authenticated(DashboardPage)} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/hordes" component={HordeContainer} />
          <Route exact path="/dash/detail/:id/:address" component={Authenticated(ItemDetail)} />
          <Route exact path="/user/:id" component={Authenticated(ProfileContainer)}/>
          <Route exact path="/register" component={RegistrationPage} />
          <Route exact path="/map" component={MapContainer} />
          <Route exact path="/invest" component={Authenticated(InvestorContainer)} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
    </AppWrapper>
  );
}
