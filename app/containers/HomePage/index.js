/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectLoading, makeSelectError, makeSelectCurrentUser,
makeSelectIsLoggedIn, makeSelectSearchString,
makeSelectForeclosureMarkers, makeSelectName } from 'containers/App/selectors';
import { handleUserLogout, handleChangeSearchString,
handleHeroSearchSubmit, handleClearCurrentForeclosureMarkers } from '../App/actions';
import H2 from 'components/H2';
import TextField from 'material-ui/TextField';
import H1 from 'components/H1';
import Img from 'components/Img';
import AppBarMUI from 'components/AppBar';
import Hero from './metes.png';
import Button from 'material-ui/Button';
import styled from 'styled-components';
import saga from './saga';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';


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
    if (this.props.searchstring && this.props.markers.length > 0) {
      this.clearSearch()
      this.clearMarkers()
    }
  }

  submitAndNav = () => {
    this.props.onSubmitForm(this.props.searchstring);
  };

  componentDidUpdate() {
  }

  render() {
    const { loading, error, searchstring, onChangeSearchString } = this.props;
    return (
        <div style={heroImgDivStyle}>
          <AppBarMUI title="Dash" auth={this.props.auth} username={this.props.username}
        history={this.props.history} logout={this.props.handleLogout} name={this.props.name}/>
          <Img src={Hero} alt={'test'}/>
          <div style={centered}>
            <div style={searchBacking}>
                <Input
                  id="hero"
                  type="text"
                  style={textInput}
                  placeholder="Address, City, State, Neighborhood"
                  value={searchstring}
                  onChange={onChangeSearchString}/>
              </div>
              <Button raised color="primary" className={'button'}
              onClick={() => this.submitAndNav()}>
                 Search
              </Button>
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
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeSearchString: (evt) => dispatch(handleChangeSearchString(evt.target.value)),
    clearSearch: dispatch(handleChangeSearchString('')),
    clearMarkers: dispatch(handleClearCurrentForeclosureMarkers()),
    onSubmitForm: (searchString) => {
      dispatch(handleHeroSearchSubmit(searchString));
    },
    handleLogout: (username) => {
      dispatch(handleUserLogout(username));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  auth: makeSelectIsLoggedIn(),
  username: makeSelectCurrentUser(),
  searchstring: makeSelectSearchString(),
  name: makeSelectName(),
  markers: makeSelectForeclosureMarkers(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
  withConnect,
  withSaga,
)(HomePage);
