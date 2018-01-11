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
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import H2 from 'components/H2';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser, makeSelectPools,
makeSelectIsLoggedIn, makeSelectUserPools } from 'containers/App/selectors';
import { handleGetUserPools } from '../App/actions';
import { withStyles } from 'material-ui/styles';
import injectSaga from 'utils/injectSaga';
import saga from './saga';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  row: {
    content: '',
    display: 'table',
    clear: 'both',
  },
  column: {
    float: 'left',
    width: '50%',
  }
});

export class InvestorContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount(){
    if (this.props.username) {
      console.log(this.props.username)
      this.props.onLoad(this.props.username)
    }
  }

  render() {
    const { classes } = this.props;
    const poolList = (this.props.userPools[0]) ? this.props.userPools.map((anObjectMapped, index) => {
    return (
        <div className={classes.root}>
          <div className={classes.row}>
            <div className={classes.column}>
              <H2>Investor Pool</H2>
            </div>
            <div className={classes.column}>
              <H2>Target Funding Amount</H2>
            </div>
          </div>
          <List>
            <ListItem button key={`${anObjectMapped.itemID}`}>
              <ListItemText primary={anObjectMapped.title + ' - $' + anObjectMapped.targetFundingAmt} />
            </ListItem>
            </List>
        </div>
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
  withStyles(styles),
)(InvestorContainer);
