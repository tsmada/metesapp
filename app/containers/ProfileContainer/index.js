/**
 *
 * ProfileContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import AppBarMUI from 'components/AppBar';
import { handleUserLogout, handleUserAccountDelete } from '../App/actions';
import { makeSelectIsLoggedIn, makeSelectCurrentUser,
makeSelectName, makeSelectMessage } from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import H2 from 'components/H2';
import H3 from 'components/H3';
import injectSaga from 'utils/injectSaga';
import saga from './saga';
import Button from 'components/Button';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import SimpleSnackbar from 'components/Snackbar';
import { CustomDialog } from 'components/Dialog';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';

const styles = (theme) => ({})

export class ProfileContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
    super(props, context);
    this.state = {
      confirmDeleteMenuOpen: false,
      password: false,
      snackbarOpen: false,
      snackbarContent: false,
    }
  }

  onClick = (e) => {
    e.preventDefault()
    this.setState({ confirmDeleteMenuOpen: true })
  };

  handleDeleteAccountCancel = e => {
    this.setState({
      confirmDeleteMenuOpen: false,
    })
  }

  handleSnackbarOpen = () => {
    //console.log('Snackbar opening onLogin')
    this.setState({ snackbarOpen: true });
  };

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ snackbarOpen: false });
  };

  handleDeleteAccountConfirm = (e) => {
    this.props.onAccountDelete(this.props.username, this.state.password)
    this.handleSnackbarOpen()
  };

  handleChange = (e) => {
    this.setState({
      password: e.target.value,
    })
  }

  handleChangeUsername = event => {
    this.setState({username: event.target.value})
  };

  handleChangePassword = event => {
    this.setState({password: event.target.value})
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
      <AppBarMUI title="Dash" auth={this.props.auth} username={this.props.username}
        history={this.props.history} logout={this.props.handleLogout} name={this.props.name}
        />
        <center>
        <H2>Welcome {this.props.username}</H2>
        <H3>Account Details</H3>
        <div>
          <span>Full Name: {this.props.name}</span>
        </div>
        <div>
          <span>Email: {this.props.username}</span>
        </div>
        <div>
          Password: Change password
        </div>
        <H3>Metes Profile</H3>
        <div>
          Username: {this.props.username}
        </div>
        <div>
          Groups: Public
        </div>
        <H3>Preferences</H3>
        <div>
          Page Size: 50
        </div>
        <div>
        Email Type: HTML
        </div>
        <div>
        Language: EN
        </div>
        <div>
        Time Zone: GMT -5 NY
        </div>
        <div>
        Keyboard Shortcuts: Enabled
        </div>
        <Button
              onClick={this.onClick}
              dense color="secondary"
            >Delete Account</Button>
        </center>
        <Dialog fullScreen={false} open={this.state.confirmDeleteMenuOpen}>
          <DialogTitle id="responsive-dialog-title">{"Delete Account?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You are attempting to delete your account. Please enter your password to finish.
            </DialogContentText>
            <TextField
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={this.handleChange}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDeleteAccountCancel} color="primary">
              Go Back
            </Button>
            <Button onClick={this.handleDeleteAccountConfirm} color="primary" autoFocus>
              Confirm and Delete Account
            </Button>
          </DialogActions>
        </Dialog>
        <SimpleSnackbar snackbarOpen={this.state.snackbarOpen} handleSnackbarClose={this.handleSnackbarClose}
        handleSnackbarOpen={this.handleSnackbarOpen} content={this.props.message}/>
      </div>
    );
  }
}

ProfileContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    handleLogout: (username) => {
      dispatch(handleUserLogout(username));
    },
    onAccountDelete: (username, password) => {
      dispatch(handleUserAccountDelete(username, password));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  auth: makeSelectIsLoggedIn(),
  username: makeSelectCurrentUser(),
  name: makeSelectName(),
  message: makeSelectMessage(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'profileContainer', saga });
const withComponent = withStyles(styles)(ProfileContainer);

export default connect(mapStateToProps, mapDispatchToProps)(withComponent);