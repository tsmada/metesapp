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
  render() {
    return (
      <div style={style}>
        <H2>Please Log Into Your Account </H2>
        <div>
          <TextField
            id="name"
            label="Name"
            margin="normal"
          /><br />
          <TextField
            id="password"
            label="Password"
            type="password"
          />
          <Button
            href="#"
          >Login</Button>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {

};

export default LoginForm;
