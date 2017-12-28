/**
*
* ListingsToolbar
*
*/

import React from 'react';
import IconMenu from 'material-ui-icons/Menu';
import IconButton from 'material-ui/IconButton';
import FontDownload from 'material-ui-icons/FontDownload';
import NavigationExpandMoreIcon from 'material-ui-icons/ExpandMore';
import MenuItem from 'material-ui/Menu';
import Menu from 'material-ui/Menu';
import Button from 'material-ui/Button';
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
          <Menu value={this.state.value} onChange={this.handleChange}>
            <MenuItem value={1} primaryText="All Cancelled Foreclosures" />
            <MenuItem value={2} primaryText="All Active Foreclosures" />
            <MenuItem value={3} primaryText="All Foreclosures" />
            <MenuItem value={4} primaryText="All Sold Foreclosures" />
          </Menu>
        </ToolbarGroup>
        <ToolbarGroup>
          <FontDownload className="muidocs-icon-custom-sort" />
          <ToolbarSeparator />
          <Button label="Make Offer" primary={true} />
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
