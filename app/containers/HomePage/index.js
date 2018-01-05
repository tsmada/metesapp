/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectLoading, makeSelectError, makeSelectCurrentUser,
makeSelectIsLoggedIn } from 'containers/App/selectors';
import { handleUserLogout } from '../App/actions';
import H2 from 'components/H2';
import TextField from 'material-ui/TextField';
import H1 from 'components/H1';
import Img from 'components/Img';
import AppBarMUI from 'components/AppBar';
import Hero from './metes.png';
import styled from 'styled-components';


const centered = {
position: 'absolute',
top: '50%',
left: '50%',
transform: 'translate(-50%, -50%)'
}

const searchInput = {
  backgroundColor: 'rgba(255,255,255,0.9)',
  width: '700px',
  position: 'absolute',
}

const heroImgDivStyle = {
  overflow: 'hidden',
  width: '100%',
  height: '800px',
  position: 'relative',
  textAlign: 'center',
  color: 'white'
}

const textInput = {
  position: 'fixed',
  width: '75%',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgba(255,255,255,0.9)'
}

const searchBacking = {
    width: '900px',
    height: '100px',
    backgroundColor: '#000000',
    opacity: 0.7,
}

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  render() {
    const { loading, error } = this.props;

    return (
        <div style={heroImgDivStyle}>
          <AppBarMUI title="Dash" auth={this.props.auth} username={this.props.username}
        history={this.props.history} logout={this.props.handleLogout}/>
          <Img src={Hero} alt={'test'}/>
          <div style={centered}>
            <div style={searchBacking}>
              <TextField
              id="search"
              type="search"
              className='search'
              margin="normal"
              style={textInput}
              placeholder='Address, City, Zip, Neighborhood, School'
              autoFocus
              />
            </div>
          </div>
        </div>

    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    },
    handleLogout: (username) => {
      dispatch(handleUserLogout(username));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  auth: makeSelectIsLoggedIn(),
  username: makeSelectCurrentUser(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(HomePage);
