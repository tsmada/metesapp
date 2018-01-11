/**
 *
 * InvestorContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import AppBarMUI from 'components/AppBar';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser, makeSelectPools,
makeSelectIsLoggedIn, makeSelectUserPools } from 'containers/App/selectors';
import { handleGetUserPools } from '../App/actions';

import injectSaga from 'utils/injectSaga';
import saga from './saga';

export class InvestorContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount(){
    if (this.props.username) {
      console.log(this.props.username)
      this.props.onLoad(this.props.username)
    }
  }

  render() {
    const poolList = (this.props.userPools[0]) ? this.props.userPools.map((anObjectMapped, index) => {
    return (
        <p key={`${anObjectMapped.itemID}`}>
            Pool - Funding
            {anObjectMapped.title} - {anObjectMapped.targetFundingAmt}
        </p>
    );
}):null;

    return (
      <div>
      <AppBarMUI title="Dash" auth={this.props.auth} username={this.props.username}
        history={this.props.history} logout={this.props.handleLogout}/>
        <div>
        {poolList}
        </div>
      </div>
    );
  }
}

InvestorContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  username: makeSelectCurrentUser(),
  userPools: makeSelectUserPools(),
  pools: makeSelectPools(),
  auth: makeSelectIsLoggedIn(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoad: (username) => {
      dispatch(handleGetUserPools(username))
    },
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'investorContainer', saga });

export default compose(
  withSaga,
  withConnect,
)(InvestorContainer);
