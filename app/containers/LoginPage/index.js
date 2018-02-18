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
import { handleUserLogin, handleUserLogout } from '../App/actions';
import H2 from 'components/H2';
import SimpleSnackbar from 'components/Snackbar';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectCurrentUser, makeSelectIsLoggedIn, makeSelectMessage,
makeSelectName } from 'containers/App/selectors';
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

  constructor(props, context) {
    super(props, context);

    this.state = {
      snackbarOpen: false,
      snackbarContent: false,
    }
  }

  handleSnackbarOpen = () => {
    console.log('Snackbar opening onLogin')
    this.setState({ snackbarOpen: true });
  };

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ snackbarOpen: false });
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>LoginPage</title>
          <meta name="description" content="Description of LoginPage" />
        </Helmet>
        <AppBarMUI title="Dash" auth={this.props.auth} username={this.props.username}
        history={this.props.history} logout={this.props.handleLogout} name={this.props.name}/>
        <LoginForm onSubmit={this.props.onLogin} history={this.props.history} snackbarOpen={this.handleSnackbarOpen}/>
        <SimpleSnackbar snackbarOpen={this.state.snackbarOpen} handleSnackbarClose={this.handleSnackbarClose}
        handleSnackbarOpen={this.handleSnackbarOpen} content={this.props.message}/>
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
    handleLogout: (username) => {
      dispatch(handleUserLogout(username));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  username: makeSelectCurrentUser(),
  auth: makeSelectIsLoggedIn(),
  name: makeSelectName(),
  message: makeSelectMessage(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(
  withSaga,
  withConnect,
)(LoginPage);