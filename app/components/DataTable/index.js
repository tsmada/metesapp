/**
*
* DataTable
*
*/

import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { grey800, brown500} from 'material-ui/styles/colors';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from 'material-ui/styles';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// import styled from 'styled-components';

const muiTheme = getMuiTheme({
  palette: {
    textColor: grey800,
    backgroundColor: grey800,
  },
  appBar: {
    height: 50,
  },
});

class DataTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    selected: [],
  };

  isSelected = (index) => {
    return this.state.selected.indexOf(index) !== -1;
  };

  handleRowSelection = (selectedRows) => {
    this.setState({
      selected: selectedRows,
    });
  };

  render() {
    return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <Table onRowSelection={this.props.onClick}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>State</TableHeaderColumn>
            <TableHeaderColumn>County</TableHeaderColumn>
            <TableHeaderColumn>Sale Date</TableHeaderColumn>
            <TableHeaderColumn>Zip Code</TableHeaderColumn>
            <TableHeaderColumn>Property Address</TableHeaderColumn>
            <TableHeaderColumn>Property Use</TableHeaderColumn>
            <TableHeaderColumn>Final Judgement</TableHeaderColumn>
            <TableHeaderColumn>Assessed Value</TableHeaderColumn>
            <TableHeaderColumn>Plaintiff Max Bid</TableHeaderColumn>
            <TableHeaderColumn>Parcel ID</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.props.tableData.slice(0,10).map((row, i) =>
                                <TableRow key={i}>
                                    <TableRowColumn>{row.state}</TableRowColumn>
                                    <TableRowColumn>{row.county}</TableRowColumn>
                                    <TableRowColumn>{row.saledate}</TableRowColumn>
                                    <TableRowColumn>{row.propertyzip}</TableRowColumn>
                                    <TableRowColumn>{row.propertyuse}</TableRowColumn>
                                    <TableRowColumn>{row.finaljudgement}</TableRowColumn>
                                    <TableRowColumn>{row.assessedvalue}</TableRowColumn>
                                    <TableRowColumn>{row.maxbid}</TableRowColumn>
                                    <TableRowColumn>{row.parcelid}</TableRowColumn>
                                </TableRow>
                            )}
        </TableBody>
      </Table>
      </MuiThemeProvider>
    );
  }
}

DataTable.propTypes = {

};

export default DataTable;
