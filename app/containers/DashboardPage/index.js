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
import ItemDetail from 'components/ItemDetail';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeSelectListings, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { loadListings, setSelectedItem } from '../App/actions';
import saga from './saga';
import messages from './messages';
import { grey800, brown500} from 'material-ui/styles/colors';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from 'material-ui/styles';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';

const style = {

  display: 'flex',
};

const muiTheme = getMuiTheme({
  palette: {
    textColor: grey800,
    backgroundColor: grey800,
  },
  appBar: {
    height: 50,
  },
});

export class DashboardPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

componentDidMount() {
    this.props.onLoad();
  }

  render() {
const item = (!!this.props.item) > 0 ? this.props.item[0].fcl_id : "test";
    return (
      <div>
        <Helmet>
          <title>DashboardPage</title>
          <meta name="description" content="Description of DashboardPage" />
        </Helmet>
        <AppBarMUI title="Dash"/>
        <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
        <Paper style={style} zDepth={3}>
        <DataTable tableData={this.props.listings} onClick={this.props.onClick}/>
        <ItemDetail {...this.props}/>
        </Paper>
        </MuiThemeProvider>
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
    onClick: (evt) => {
      dispatch(setSelectedItem(evt[0]));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'dashboardPage', saga });

export default compose(
  withSaga,
  withConnect,
)(DashboardPage);
