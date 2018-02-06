/**
 *
 * RegistrationPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import RegistrationForm from 'components/RegistrationForm';
import { handleRegisterAccount } from '../App/actions';
import { Helmet } from 'react-helmet';
import { makeSelectCurrentUser, makeSelectIsLoggedIn, makeSelectMessage,
makeSelectName } from 'containers/App/selectors';
import AppBarMUI from 'components/AppBar';
import H2 from 'components/H2';
import Paper from 'material-ui/Paper';
import SimpleSnackbar from 'components/Snackbar';

import injectSaga from 'utils/injectSaga';
import saga from './saga';
import messages from './messages';


const style = {
  display: 'flex',
};

export class RegistrationPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
    super(props, context);

    this.state = {
      snackbarOpen: false,
      snackbarContent: false,
    }
  }

  handleSnackbarOpen = () => {
    console.log('Snackbar opening onRegister')
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
          <title>RegistrationPage</title>
          <meta name="description" content="Description of RegistrationPage" />
        </Helmet>
        <AppBarMUI title="Register" auth={this.props.auth} username={this.props.username}
        history={this.props.router} logout={this.props.handleLogout} name={this.props.name}/>
        <Paper style={style} zDepth={3}>
          <RegistrationForm onSubmit={this.props.handleSubmitRegistration} snackbarOpen={this.handleSnackbarOpen}/>
        </Paper>
        <SimpleSnackbar snackbarOpen={this.state.snackbarOpen} handleSnackbarClose={this.handleSnackbarClose}
        handleSnackbarOpen={this.handleSnackbarOpen} content={this.props.message}/>
      </div>
    );
  }
}

RegistrationPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  username: makeSelectCurrentUser(),
  auth: makeSelectIsLoggedIn(),
  message: makeSelectMessage(),
  name: makeSelectName(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleSubmitRegistration: (username, password, name) => {
      dispatch(handleRegisterAccount(username, password, name));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'registrationPage', saga });

export default compose(
  withSaga,
  withConnect,
)(RegistrationPage);
