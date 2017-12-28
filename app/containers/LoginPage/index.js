/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import LoginForm from 'components/LoginForm';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { Helmet } from 'react-helmet';
import AppBarMUI from 'components/AppBar';


import grey from 'material-ui/colors/grey';
import brown from 'material-ui/colors/brown';
const grey800 = grey['800'];
const brown500 = brown['500'];
import Paper from 'material-ui/Paper';

const style = {
  display: 'flex',
};

export class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  

  render() {
    return (
      <div>
        <Helmet>
          <title>LoginPage</title>
          <meta name="description" content="Description of LoginPage" />
        </Helmet>
        <AppBarMUI title="Login"/>
        <Paper style={style} zDepth={3}>
        <LoginForm />
        </Paper>
      </div>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginpage: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);