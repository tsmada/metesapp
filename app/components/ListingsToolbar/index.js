/**
*
* ListingsToolbar
*
*/

import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

// import styled from 'styled-components';


const style = {
   position: "fixed",
   bottom: 0,
   zindex: 100,
   width: '91.25%',
}

class ListingsToolbar extends React.Component { // eslint-disable-line react/prefer-stateless-function
    
    constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <Toolbar style={style}>
        <ToolbarGroup firstChild={true}>
          <DropDownMenu value={this.state.value} onChange={this.handleChange}>
            <MenuItem value={1} primaryText="All Cancelled Foreclosures" />
            <MenuItem value={2} primaryText="All Active Foreclosures" />
            <MenuItem value={3} primaryText="All Foreclosures" />
            <MenuItem value={4} primaryText="All Sold Foreclosures" />
          </DropDownMenu>
        </ToolbarGroup>
        <ToolbarGroup>
          <FontIcon className="muidocs-icon-custom-sort" />
          <ToolbarSeparator />
          <RaisedButton label="Make Offer" primary={true} />
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText="Download Selected Listings" />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

ListingsToolbar.propTypes = {

};

export default ListingsToolbar;
