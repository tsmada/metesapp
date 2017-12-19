/**
*
* AppBar
*
*/

import React from 'react';
import AppBar from 'material-ui/AppBar';
import PropTypes from 'prop-types';
import { grey800, brown500} from 'material-ui/styles/colors';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

class AppBarMUI extends React.Component { // eslint-disable-line react/prefer-stateless-function
    
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
        <div>
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <AppBar
    title={this.props.title}
    iconClassNameRight="muidocs-icon-navigation-expand-more"
    onLeftIconButtonClick={this.handleToggle}/>
    </MuiThemeProvider>
    <MuiThemeProvider muiTheme={muiTheme}>
    <Drawer open={this.state.open}>
          <MenuItem onClick={this.handleToggle}>Menu Item</MenuItem>
          <MenuItem onClick={this.handleToggle}>Menu Item 2</MenuItem>
    </Drawer>
    </MuiThemeProvider>
    </div>
    );
  }
}

const muiTheme = getMuiTheme({
  palette: {
    textColor: brown500,
  },
  appBar: {
    height: 50,
  },
});

AppBarMUI.propTypes = {
    title: PropTypes.any,
};

export default AppBarMUI;
