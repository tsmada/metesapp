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
import { makeSelectListings, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { loadListings } from '../App/actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class DashboardPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

componentDidMount() {
    this.props.onLoad();
  }

  render() {
    
    return (
      <div>
        <Helmet>
          <title>DashboardPage</title>
          <meta name="description" content="Description of DashboardPage" />
        </Helmet>
        <AppBarMUI title="Dash"/>
        <DataTable tableData={this.props.listings}/>
      </div>
    );
  }
}



const mapStateToProps = createStructuredSelector({
  listings: makeSelectListings(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoad: () => {
      dispatch(loadListings());
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'dashboardPage', reducer });
const withSaga = injectSaga({ key: 'dashboardPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DashboardPage);
