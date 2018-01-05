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
import injectSaga from 'utils/injectSaga';
import saga from './saga';

export class ProfileContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
      <AppBarMUI title="Dash" auth={this.props.auth} username={this.props.username}
        history={this.props.history} logout={this.props.handleLogout}
        />
        <H2>Welcome {this.props.username}</H2>
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
