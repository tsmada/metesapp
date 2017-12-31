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
import LoginPage from 'containers/LoginPage/Loadable';
import RegistrationPage from 'containers/RegistrationPage/Loadable';
import ItemDetail from 'containers/ItemDetail/Loadable';
import DashboardContainer from 'containers/DashboardPage';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';

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
        <Route exact path="/dash" component={DashboardPage} />
        <Route exact path="/login" component={LoginPage} />
          <Route exact path="/registration" component={RegistrationPage} />
        <Route exact path="/dash/detail/:id" component={ItemDetail}/>
        <Route exact path="/dash/detail/:id" component={ItemDetail}/>
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
    </AppWrapper>
  );
}
