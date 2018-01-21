/**
 *
 * ItemDetail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBarMUI from 'components/AppBar';
import Paper from 'material-ui/Paper';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { makeSelectItemDetail, makeSelectIsLoggedIn, makeSelectCurrentUser,
makeSelectName } from 'containers/App/selectors';
import injectReducer from 'utils/injectReducer';
import H1 from 'components/H1';
import Countdown from 'components/Countdown';
import H2 from 'components/H2';
import P from 'components/P';
import reducer from 'containers/App/reducer';
import { loadDetail, handleUserLogout } from '../App/actions';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';

import injectSaga from 'utils/injectSaga';
import saga from './saga';

const style = {
  display: 'flex',
}

const styleHalf = {
  display: 'flex',
  width: '50%',
}

const muiTheme = {
  display: 'flex',
}

export class ItemDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    if (this.props.params.id) {
      this.props.onLoad(this.props.params.id);
    }
  }

  render() {
    if (!this.props.item[0]){
      return (
        <div>Loading....</div>
        )
    }
    const content = this.props.item[0].county + ' County foreclosure - ' + this.props.item[0].propertyaddress +
    ' foreclosure - Case Number ' + this.props.item[0].casenumber + ' foreclosure - Sale Date ' + 
    this.props.item[0].saledate + ' foreclosure - Address ' + this.props.item[0].propertyaddress + ', ' +
    this.props.item[0].propertycity + ', ' + this.props.item[0].state + ', ' + this.props.item[0].propertyzip + ' foreclosure';
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
            <title>{this.props.item[0].propertyaddress} Foreclosure,</title>
            <meta name="description" content={content} />
        </Helmet>
        <div>
          <AppBarMUI title="Dash" auth={this.props.auth} username={this.props.username}
        history={this.props.router} logout={this.props.handleLogout} name={this.props.name}/>
        </div>
        
          <div>
            <Paper style={style} zDepth={3}>
            <div>
            <center>
              <H1>
              {this.props.item[0].propertyaddress},  
{this.props.item[0].propertycity}, {this.props.item[0].state}, 
 {this.props.item[0].county} County
              </H1>
              <H2><Countdown date={this.props.item[0].saledate}/></H2>
              </center>
            </div>
            </Paper>
          </div>

        <P/>
        
          <div>
            <Paper style={styleHalf} zDepth={3}>
              <img src={'https://www.serouslabs.com/images/' + this.props.item[0].localimgpath}></img>
            </Paper>
          </div>

        <P/>

          <div>
            <Paper style={style} zDepth={3}>
              <H2>Property Information</H2>
            </Paper>
          </div>

          <div>
            <Paper style={style} zDepth={3}>
             <Table selectable={false}>
              <TableHead displaySelectAll={false}>
                <TableRow>
                  <TableCell>Parcel ID</TableCell>
                  <TableCell>Property Owner</TableCell>
                  <TableCell>Legal Description</TableCell>
                  <TableCell>Property Use</TableCell>
                  <TableCell>Year Built</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{this.props.item[0].parcelid}</TableCell>
                  <TableCell>{this.props.item[0].propertyowner}</TableCell>
                  <TableCell>{this.props.item[0].legaldescription}</TableCell>
                  <TableCell>{this.props.item[0].propertyuse}</TableCell>
                  <TableCell>{this.props.item[0].yearbuilt}</TableCell>
                </TableRow>
              </TableBody>

              <TableHead displaySelectAll={false}>
                <TableRow>
                  <TableCell>Assessed Value</TableCell>
                  <TableCell>Total Area</TableCell>
                  <TableCell>Structure Area</TableCell>
                  <TableCell>Bedrooms</TableCell>
                  <TableCell>Bathrooms</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{this.props.item[0].assessedvalue}</TableCell>
                  <TableCell>{this.props.item[0].totalarea}</TableCell>
                  <TableCell>{this.props.item[0].structurearea}</TableCell>
                  <TableCell>{this.props.item[0].bedrooms}</TableCell>
                  <TableCell>{this.props.item[0].bathrooms}</TableCell>
                </TableRow>
              </TableBody>
              </Table>
            </Paper>
          </div>

        <P/>

        <div>
            <Paper style={style} zDepth={3}>
              <H2>Case Information</H2>
            </Paper>
          </div>

          <div>
            <Paper style={style} zDepth={3}>
             <Table selectable={false}>
              <TableHead displaySelectAll={false}>
                <TableRow>
                  <TableCell>Case Number</TableCell>
                  <TableCell>Max Bid</TableCell>
                  <TableCell>Defendant</TableCell>
                  <TableCell>Plaintiff</TableCell>
                  <TableCell>Max Bid</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{this.props.item[0].casenumber}</TableCell>
                  <TableCell>{this.props.item[0].maxbid}</TableCell>
                  <TableCell>{this.props.item[0].defendant}</TableCell>
                  <TableCell>{this.props.item[0].plaintiff}</TableCell>
                  <TableCell>{this.props.item[0].maxbid}</TableCell>
                </TableRow>
              </TableBody>
              </Table>
            </Paper>
          </div>

        <P/>
        <div>
            <Paper style={style} zDepth={3}>
              <H2>Property Sales History</H2>
            </Paper>
          </div>

          <div>
            <Paper style={style} zDepth={3}>
             <Table selectable={false}>
              <TableHead displaySelectAll={false}>
                <TableRow>
                  <TableCell>Sale Date</TableCell>
                  <TableCell>Sale Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                </TableRow>
              </TableBody>
              </Table>
            </Paper>
          </div>

        <P/>
        <div>
            <Paper style={style} zDepth={3}>
              <H2>Chain of Title</H2>
            </Paper>
          </div>

          <div>
            <Paper style={style} zDepth={3}>
             <Table selectable={false}>
              <TableHead displaySelectAll={false}>
                <TableRow>
                  <TableCell>Listed on Deed</TableCell>
                  <TableCell>Issues</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                </TableRow>
              </TableBody>
              </Table>
            </Paper>
          </div>

        <P/>
      </div>
    );
  }
}
export function mapDispatchToProps(dispatch) {
  return {
    onLoad: (id) => {
      dispatch(loadDetail(id));
    },
    handleLogout: (username) => {
      dispatch(handleUserLogout(username));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  item: makeSelectItemDetail(),
  auth: makeSelectIsLoggedIn(),
  name: makeSelectName(),
  username: makeSelectCurrentUser(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'itemDetail', reducer });
const withSaga = injectSaga({ key: 'itemDetail', saga });

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);