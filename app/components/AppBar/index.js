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
//import Notifications from 'material-ui-icons/Notifications';
import PriorityHigh from 'material-ui-icons/PriorityHigh';
import Badge from 'material-ui/Badge';
import Switch from 'material-ui/Switch';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Menu, { MenuItem } from 'material-ui/Menu';
import Notifications from 'react-notification-system-redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeSelectNotifications } from 'containers/App/selectors';


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
  NotificationItem: { // Override the notification item
    DefaultStyle: { // Applied to every notification, regardless of the notification level
      margin: '10px 5px 2px 1px',
    },

    success: { // Applied only to the success notification item
      color: 'red',
    },
  },
};

class AppBarMUI extends React.Component {

  constructor(props) {
    super(props);
    this.state = { draweropen: false,
      anchorEl: null,
      notificationsopen: false,
      notificationCount: 1 };
  }

  handleToggle = () => {
    this.setState({ draweropen: !this.state.draweropen });
  };

  handleToggleNotifications = () => {
    this.setState({ notificationsopen: !this.state.notificationsopen,
      notificationCount: 0 });
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    this.setState({ anchorEl: null });
    this.props.logout(this.props.username);
    this.props.history.push('/login');
  };

  handleProfileClick = () => {
    const username = this.props.username;
    if (username) {
      this.props.history.push(`/user/${username}`);
      this.setState({ anchorEl: null });
    } else {
      this.setState({ ancholEl: null });
    }
  };


  render() {
    const { classes, auth, handleLogout, username, logout } = this.props;
    const { anchorEl, draweropen, notificationsopen, notificationCount } = this.state;
    const open = Boolean(anchorEl);
    const { notifications } = this.props;
    const notificationMenu = (notificationCount > 0)
            ? (<Badge className={classes.badge} badgeContent={this.state.notificationCount} color="secondary">
              <Notifications />
            </Badge>)
            : <Notifications />;

    return (
      <div className={classes.root}>
        <Notifications
          notifications={notifications}
          style={styles}
        />
        <AppBar position="static">
          <Toolbar >
            <IconButton className={classes.menuButton} color="contrast" aria-label="Menu" onClick={this.handleToggle}>
              <MenuIcon />
              <Drawer
                open={this.state.draweropen} onRequestClose={this.handleToggle} onClose={this.handleToggle}
                docked
              >
                <Link to="/dash">
                  <MenuItem onClick={this.handleToggle}>Foreclosures Dashboard</MenuItem>
                </Link>
                <Link to="/">
                  <MenuItem onClick={this.handleToggle}>Hero Search</MenuItem>
                </Link>
                <Link to="/login">
                  <MenuItem onClick={this.handleToggle}>Account Login</MenuItem>
                </Link>
                <Link to="/register">
                  <MenuItem onClick={this.handleToggle}>Register</MenuItem>
                </Link>
                <Link to="/map">
                  <MenuItem onClick={this.handleToggle}>Map</MenuItem>
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
                onClick={this.handleToggleNotifications}
                color="contrast"
                tooltip="Notifications"
              >
                {notificationMenu}
              </IconButton>
              <Menu
                id="menu-appbar-notifications"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={notificationsopen}
              >
                <MenuItem onClick={this.handleToggleNotifications}><PriorityHigh />Watched Listing Auction Starting in 5 minutes.</MenuItem>
              </Menu>
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
                <MenuItem onClick={this.handleProfileClick}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
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
  notifications: PropTypes.array,
};

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  notifications: makeSelectNotifications,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
    withConnect,
    withStyles(styles),
)(AppBarMUI);
