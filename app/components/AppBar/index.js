import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Switch from 'material-ui/Switch';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Menu, { MenuItem } from 'material-ui/Menu';

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class AppBarMUI extends React.Component {

  constructor(props) {
    super(props);
    this.state = {draweropen: false, auth: true, anchorEl: null};
  }

  handleToggle = () => { 
    this.setState({draweropen: !this.state.draweropen})
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl, draweropen } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={auth} onChange={this.handleChange} aria-label="LoginSwitch" />
            }
            label={auth ? 'Logout' : 'Login'}
          />
        </FormGroup>
        <AppBar position="static">
          <Toolbar >
            <IconButton className={classes.menuButton} color="contrast" aria-label="Menu" onClick={this.handleToggle}>
              <MenuIcon />
              <Drawer open={this.state.draweropen} onRequestChange={this.handleToggle} docked={false}>
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
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              Listings Dashboard
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="contrast"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

AppBarMUI.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBarMUI);
