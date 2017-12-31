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
makeSelectPageNumber, makeSelectChangeSortOrder, makeSelectChangeSortDirection,
makeSelectSelected } from 'containers/App/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { loadListings, setSelectedItem, changeRowsPerPage, changePage,
handleRequestSort, handleSelectAllClick, handleSelectItem, loadDetail } from '../App/actions';
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

  render() {
    return (
      <div>
        <Helmet>
          <title>DashboardPage</title>
          <meta name="description" content="Description of DashboardPage" />
        </Helmet>
        <AppBarMUI title="Dash"/>
        <Paper style={style}>
        <DataTable history={this.props.history}/>
        </Paper>
        <div>
        <P/>
        </div>
      </div>
    );
  }
}



export default DashboardPage;