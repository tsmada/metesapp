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
import { makeSelectItemDetail } from 'containers/App/selectors';
import injectReducer from 'utils/injectReducer';
import H1 from 'components/H1';
import H2 from 'components/H2';
import P from 'components/P';
import reducer from 'containers/App/reducer';
import { loadDetail } from '../App/actions';
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
    this.props.onLoad(this.props.match.params.id);
  }

  render() {
    const header = (!!this.props.item[0]) ? <H1>{this.props.item[0].propertyaddress}
    , {this.props.item[0].propertycity}, {this.props.item[0].state}, {this.props.item[0].county} County
    </H1> : 'loading';
    const propertyImage = (!!this.props.item[0]) ? <img src={'https://www.serouslabs.com/images/' + this.props.item[0].localimgpath}></img> : 'loading';
    const propertyInfo = (!!this.props.item[0]) ? <TableCell>{this.props.item[0].parcelid}</TableCell> : 'loading';
    const casenumber = (!!this.props.item[0]) ? <TableCell>{this.props.item[0].casenumber}</TableCell> : 'loading';
    const propertyOwner = (!!this.props.item[0]) ? <TableCell>{this.props.item[0].propertyowner}</TableCell> : 'loading';
    const assessedValue = (!!this.props.item[0]) ? <TableCell>{this.props.item[0].assessedvalue}</TableCell> : 'loading';
    const finalJudgementAmount = (!!this.props.item[0]) ? <TableCell>{this.props.item[0].finaljudgement}</TableCell> : 'loading';
    return (
      <div>
        <div>
          <AppBarMUI title="Foreclosure Detail" auth={this.props.auth}/>
        </div>
        
          <div>
            <Paper style={style} zDepth={3}>
              {header}
            </Paper>
          </div>

        <P/>
        
          <div>
            <Paper style={styleHalf} zDepth={3}>
              {propertyImage}
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
                  <TableCell>Case Number</TableCell>
                  <TableCell>Property Owner</TableCell>
                  <TableCell>Assessed Value</TableCell>
                  <TableCell>Final Judgement Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                {propertyInfo}
                {casenumber}
                {propertyOwner}
                {assessedValue}
                {finalJudgementAmount}
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
  };
}

const mapStateToProps = createStructuredSelector({
  item: makeSelectItemDetail(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'itemDetail', reducer });
const withSaga = injectSaga({ key: 'itemDetail', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ItemDetail);