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
  margin: '0 10px',
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
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
          />
          <TextField
            hintText="Hint Text"
            floatingLabelText="Fixed Floating Label Text"
            floatingLabelFixed
          /><br />
          <TextField
            hintText="Password Field"
            floatingLabelText="Password"
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
