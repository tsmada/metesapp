/**
*
* LoginForm
*
*/

import React from 'react';
import TextField from 'material-ui/TextField';
import H2 from 'components/H1';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from 'material-ui/styles';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const style = {
  display: 'flex',
  flexDirection: 'column',
  margin: '0 10px'
}


class LoginForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
	      <div style={style}>
	      	<H2>Please Log Into Your Account </H2>
	      	<div>
		        <TextField
			      hintText="Hint Text"
			      floatingLabelText="Fixed Floating Label Text"
			      floatingLabelFixed={true}
			    /><br />
			    <TextField
			      hintText="Password Field"
			      floatingLabelText="Password"
			      type="password"
			    />
			</div>
	      </div>
    );
  }
}

LoginForm.propTypes = {

};

export default LoginForm;
