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
import H3 from 'components/H3';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser, makeSelectPools,
makeSelectIsLoggedIn, makeSelectUserPools, makeSelectName } from 'containers/App/selectors';
import { handleGetUserPools } from '../App/actions';
import { withStyles } from 'material-ui/styles';
import injectSaga from 'utils/injectSaga';
import saga from './saga';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import P from 'components/P';
import SimpleCard from 'components/SimpleCard';
import HordeTable from 'components/HordeTable';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    overflowX: 'auto',
  },
  row: {
    content: '',
    display: 'table',
    clear: 'both',
  },
  column: {
    float: 'left',
    width: '50%',
  },
  title: {
    marginLeft: 10,
    marginTop: 0,
    marginRight: 10,
    marginBottom: 10,
    width: '100%',
  },
  subtitle: {
    marginLeft: 20,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
    width: '100%',
    color: 'gray',
  },
  header: {
    marginLeft: 10,
    marginTop: 0,
    marginRight: 10,
    marginBottom: 10,
    width: '100%',
  },
  table: {
    jusfify: 'center',
    width: '85%',
    marginLeft: 30,
    marginBottom: 30,
    marginRight: 10,
    marginTop: 10,
  },
  cardrow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  card: {
    width: '100%',
    maxWidth: 250,
    maxHeight: 250,
    marginLeft: 40,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    flex: 1,
  },
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
    return (
      <div>
      <AppBarMUI title="Dash" auth={this.props.auth} username={this.props.username}
        history={this.props.router} logout={this.props.handleLogout} name={this.props.name}/>
        <div>
          <div className={classes.header}>
            <Paper elevation={4}>
              <div className={classes.title}>
                <H2>Hordes</H2>
              </div>
              <div className={classes.subtitle}>
                <H3>Recently Viewed</H3>
              </div>
              <P/>
              <div className={classes.cardrow}>
                <div className={classes.card}>
                  <SimpleCard headline={'Greasy-Raider'} comment={'3 bedroom, 3 bath, 30.2% Projected ROI'}/>
                </div>
                <div className={classes.card}>
                  <SimpleCard headline={'Fuzzy-Diaper'} comment={'4 bedroom, 2 bath, 18.3% Projected ROI'}/>
                </div>
                <div className={classes.card}>
                  <SimpleCard headline={'Against-All-Odds'} comment={'2 bedroom, 1 bath, 11.82% Projected ROI'}/>
                </div>
                <div className={classes.card}>
                  <SimpleCard headline={'Silent-Earnings'} comment={'1 bedroom, 1 bath, 19.12% Projected ROI'}/>
                </div>
              </div>
              <P/>
              <div className={classes.table}>
                <HordeTable pools={this.props.pools}/>
              </div>
              <P/>
            </Paper>
          </div>
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
  name: makeSelectName(),
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
