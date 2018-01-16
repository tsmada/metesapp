/**
*
* RegistrationForm
*
*/

import React from 'react';
import TextField from 'material-ui/TextField';
import H2 from 'components/H2';
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

const formStyle = {
  marginBottom: '20px',
};

class RegistrationForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: false,
      password: false,
      name: false,
    }
  }

  onClick = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state.username, this.state.password, this.state.name);
    this.props.snackbarOpen();
  };

  handleChangeUsername = event => {
    this.setState({username: event.target.value})
  };

  handleChangePassword = event => {
    this.setState({password: event.target.value})
  };

  handleChangeName = event => {
    this.setState({name: event.target.value})
  };

  render() {
    return (
      <div style={style}>
        <H2>Register</H2>
        <div style={formStyle}>
          <TextField
            id="name"
            label="Name"
            margin="normal"
            onChange={this.handleChangeName}
          /><br />
          <TextField
            id="password"
            label="Password"
            type="password"
            onChange={this.handleChangePassword}
          /><br />
          <TextField
            id="email"
            label="E-Mail"
            margin="normal"
            onChange={this.handleChangeUsername}
          />
          <Button href="#" onClick={this.onClick}>Sign Up</Button>
        </div>
      </div>
    );
  }
}

RegistrationForm.propTypes = {

};

export default RegistrationForm;
