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
import { handleUserLogin } from '../App/actions';
import H2 from 'components/H2';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectCurrentUser, makeSelectIsLoggedIn, makeSelectMessage } from 'containers/App/selectors';
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
        <AppBarMUI title="Login" auth={this.props.auth}/>
        <Paper style={style} zDepth={3}>
        <LoginForm onSubmit={this.props.onLogin}/>
        <H2><center>{this.props.message}</center></H2>
        </Paper>
      </div>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    onLogin: (username, password) => {
      dispatch(handleUserLogin(username, password));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  username: makeSelectCurrentUser(),
  auth: makeSelectIsLoggedIn(),
  message: makeSelectMessage(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(
  withSaga,
  withConnect,
)(LoginPage);