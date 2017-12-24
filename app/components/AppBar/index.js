/**
*
* AppBar
*
*/

import React from 'react';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { grey800, brown500} from 'material-ui/styles/colors';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const style = {
  display: 'flex',
};

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
        <Paper style={style} zDepth={3}>
        <AppBar
    title={this.props.title}
    iconClassNameRight="muidocs-icon-navigation-expand-more"
    onLeftIconButtonClick={this.handleToggle}/>
        </Paper>
    </MuiThemeProvider>
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <Drawer open={this.state.open} onRequestChange={this.handleToggle} docked={false}>
          <Link to="/dash">
          <MenuItem onClick={this.handleToggle}>Foreclosures Dashboard</MenuItem>
          </Link>
          <Link to="/">
          <MenuItem onClick={this.handleToggle}>Admin Dashboard</MenuItem>
          </Link>
          <Link to="/login">
          <MenuItem onClick={this.handleToggle}>Account Login</MenuItem>
          </Link>
    </Drawer>
    </MuiThemeProvider>
    </div>
    );
  }
}

AppBarMUI.propTypes = {
    title: PropTypes.any,
};

export default AppBarMUI;
