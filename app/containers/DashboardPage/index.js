/**
 *
 * DashboardPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import AppBarMUI from 'components/AppBar';
import DataTable from 'components/DataTable';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeSelectListings, makeSelectLoading, makeSelectError, makeSelectRowsPerPage,
makeSelectPageNumber, makeSelectChangeSortOrder, makeSelectChangeSortDirection } from 'containers/App/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { loadListings, setSelectedItem, changeRowsPerPage, changePage,
handleRequestSort } from '../App/actions';
import ListingsToolbar from 'components/ListingsToolbar';
import saga from './saga';
import messages from './messages';
import grey from 'material-ui/colors/grey';
import brown from 'material-ui/colors/brown';
const grey800 = grey['800'];
const brown500 = brown['500'];
import P from 'components/P';
import Paper from 'material-ui/Paper';
import { Switch, Route } from 'react-router-dom';


const style = {
  display: 'flex',
};


export class DashboardPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

componentDidMount() {
    this.props.onLoad();
  }

onCellClick = (fcl_id, evt) => {
    console.log(evt);
    this.props.history.push('/dash/detail/'+fcl_id);
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>DashboardPage</title>
          <meta name="description" content="Description of DashboardPage" />
        </Helmet>
        <AppBarMUI title="Dash"/>
        <Paper style={style}>
        <DataTable data={this.props.data} rowsPerPage={this.props.rowsPerPage} 
        handleChangeRowsPerPage={this.props.handleChangeRowsPerPage} page={this.props.page}
        handleChangePage={this.props.handleChangePage} orderBy={this.props.orderBy}
        handleRequestSort={this.props.handleRequestSort}
        />
        </Paper>
        <div>
        <P/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  data: makeSelectListings(),
  rowsPerPage: makeSelectRowsPerPage(),
  page: makeSelectPageNumber(),
  orderBy: makeSelectChangeSortOrder(),
  order: makeSelectChangeSortDirection(),
});

function mapDispatchToProps(dispatch, ownProps) {

  return {
    onLoad: () => {
      dispatch(loadListings());
    },
    handleChangeRowsPerPage: (event) => {
    dispatch(changeRowsPerPage(event.target.value))
    },
    handleChangePage: (event, page) => {
    dispatch(changePage(page));
    },
    handleRequestSort: (orderBy, order, data) => {
      dispatch(handleRequestSort(orderBy, order, data))
    }
  }
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'dashboardPage', saga });

export default compose(
  withSaga,
  withConnect,
)(DashboardPage);