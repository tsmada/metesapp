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
import { Menu, MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import { Toolbar } from 'material-ui/Toolbar';

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
          
          
      </Toolbar>
    );
  }
}

ListingsToolbar.propTypes = {

};

export default ListingsToolbar;
