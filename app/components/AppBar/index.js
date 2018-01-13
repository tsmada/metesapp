import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Dashboard from 'material-ui-icons/Dashboard';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import IconButton from 'material-ui/IconButton';
import AccountBoxIcon from 'material-ui-icons/AccountBox';
import SearchIcon from 'material-ui-icons/Search';
import PlaceIcon from 'material-ui-icons/Place';
import PermIdentity from 'material-ui-icons/PermIdentity';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Notifications from 'material-ui-icons/Notifications';
import PriorityHigh from 'material-ui-icons/PriorityHigh';
import Badge from 'material-ui/Badge';
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
    this.state = { draweropen: false, anchorEl: null, notificationsopen: false,
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
    this.props.history.push('/user/' + username);
    this.setState({ anchorEl: null });
  } else {
    this.setState({ ancholEl: null });
  }
  };

  handleInvestmentsClick = () => {
    const username = this.props.username;
    if (username) {
    this.props.history.push('/invest/');
    this.setState({ anchorEl: null });
  } else {
    this.setState({ ancholEl: null });
  }
  };


  render() {
    const { classes, auth, handleLogout, username, logout } = this.props;
    const { anchorEl, draweropen, notificationsopen, notificationCount } = this.state;
    const open = Boolean(anchorEl);
    const notificationMenu = (notificationCount > 0)
    ? <Badge className={classes.badge} badgeContent={this.state.notificationCount} color="secondary">
        <Notifications />
      </Badge>
    : <Notifications />;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar >
            <IconButton className={classes.menuButton} color="contrast" aria-label="Menu" onClick={this.handleToggle}>
              <MenuIcon />
              <Drawer open={this.state.draweropen} onRequestClose={this.handleToggle} onClose={this.handleToggle}
              docked={true}>
               <List className={classes.root} subheader={<ListSubheader>Navigate</ListSubheader>}>
                <ListItem button>
                  <ListItemIcon>
                    <Dashboard />
                  </ListItemIcon>
                  <ListItemText inset primary="Foreclosure Dashboard" onClick={() => {this.props.history.push('/dash')}}/>
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <SearchIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Map Search" onClick={() => {this.props.history.push('/')}} />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <PlaceIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Map Browse" onClick={() => {this.props.history.push('/map')}}/>
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <PermIdentity />
                  </ListItemIcon>
                  <ListItemText inset primary="Account Sign In" onClick={() => {this.props.history.push('/login')}}/>
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <AccountBoxIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Register Account" onClick={() => {this.props.history.push('/register')}}/>
                </ListItem>
              </List>
              </Drawer>
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              metes.io
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
                  <MenuItem onClick={this.handleToggleNotifications}><PriorityHigh/>Watched Listing Auction Starting in 5 minutes.</MenuItem>
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
                  <MenuItem onClick={this.handleInvestmentsClick}>Manage Investments</MenuItem>
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
};

export default withStyles(styles)(AppBarMUI);
