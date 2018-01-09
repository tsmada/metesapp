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
import { handleUserLogout } from '../App/actions';
import { makeSelectIsLoggedIn, makeSelectCurrentUser } from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import H2 from 'components/H2';
import H3 from 'components/H3';
import injectSaga from 'utils/injectSaga';
import saga from './saga';

export class ProfileContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
      <AppBarMUI title="Dash" auth={this.props.auth} username={this.props.username}
        history={this.props.history} logout={this.props.handleLogout}
        />
        <center>
        <H2>Welcome {this.props.username}</H2>
        <H3>Account Details</H3>
        <div>
          <span>Full Name: Test Name</span>
        </div>
        <div>
          <span>Email: email@email.com</span>
        </div>
        <div>
          Password: Change password
        </div>
        <H3>Metes Profile</H3>
        <div>
          Username: {this.props.username}
        </div>
        <div>
          Groups: admin
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
        </center>
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
  };
}

const mapStateToProps = createStructuredSelector({
  auth: makeSelectIsLoggedIn(),
  username: makeSelectCurrentUser(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'profileContainer', saga });

export default compose(
  withSaga,
  withConnect,
)(ProfileContainer);
