/**
*
* LoginForm
*
*/

import React from 'react';
import TextField from 'material-ui/TextField';
import H3 from 'components/H3';
import Button from 'components/Button';
import { withStyles } from 'material-ui/styles';

// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const styles = (theme) => ({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  signInPane: {
    height: 'auto',
    minHeight: '500px',
    minWidth: '450px',
    overflowY: 'auto',
    padding: '48px 40px 36px',
    display: 'block',
    flexDirection: 'column',
    minHeight: '100vh',
    marginTop: '45px',
    marginBottom: '45px',
    position: 'relative',
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)',
  },
})


class LoginForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props, context) {
    super(props, context);
    this.state = {
      username: false,
      password: false
    }
  }

  onClick = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state.username, this.state.password)
  };

  handleChangeUsername = event => {
    this.setState({username: event.target.value})
  };

  handleChangePassword = event => {
    this.setState({password: event.target.value})
  };

  render() {
    const { classes, snackbarOpen } = this.props;
    return (
      <div className={classes.base}>
        <div className={classes.signInPane}>
          <H3>Sign In</H3>
          <div>
            <TextField
              id="username"
              label="Username"
              margin="normal"
              onChange={this.handleChangeUsername}
            /><br />
            <TextField
              id="password"
              label="Password"
              type="password"
              onChange={this.handleChangePassword}
            />
            <Button
              href="#"
              onClick={(e) => {this.onClick(e);this.props.snackbarOpen();}}
              autoFocus
              dense color="primary"
            >Sign In</Button>
            <Button
              href="#"
              onClick={(e) => {this.onClick(e);this.props.snackbarOpen();}}
              dense color="secondary"
            >Forgot Username?</Button>
            <Button
              onClick={(e) => {this.props.history.push('/register')}}
              dense color="primary"
            >Register</Button>
          </div>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {

};

export default withStyles(styles)(LoginForm);
