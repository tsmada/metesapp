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
  render() {
    return (
      <div style={style}>
        <H2>Register</H2>
        <div style={formStyle}>
          <TextField
            id="name"
            label="Name"
            margin="normal"
          /><br />
          <TextField
            id="password"
            label="Password"
            type="password"
          /><br />
          <TextField
            id="email"
            label="E-Mail"
            margin="normal"
          />
          <Button href="#">Sign Up</Button>
        </div>
      </div>
    );
  }
}

RegistrationForm.propTypes = {

};

export default RegistrationForm;
