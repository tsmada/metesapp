/**
*
* LoginForm
*
*/

import React from 'react';
import TextField from 'material-ui/TextField';
import H2 from 'components/H1';
import Button from 'components/Button';

// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
};


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
    const { classes } = this.props;
    return (
      <div style={style}>
        <H2>Please Log Into Your Account </H2>
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
            onClick={this.onClick}
          >Login</Button>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {

};

export default LoginForm;
