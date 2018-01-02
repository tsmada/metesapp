/**
 *
 * MapContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { makeSelectIsLoggedIn } from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import AppBarMUI from 'components/AppBar';

import injectSaga from 'utils/injectSaga';
import saga from './saga';

const style = {
  width: '100%',
  overflow: 'none',
  height: '100%'
}


export class MapContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
      <AppBarMUI title="Mapview" auth={this.props.auth}/>
       <Map google={this.props.google}
        style={{width: '100%', height: '100%', position: 'relative'}}
        className={'map'}
        zoom={14}>
      <Marker
        title={'The marker`s title will appear as a tooltip.'}
        name={'SOMA'}
        position={{lat: 37.778519, lng: -122.405640}} />
      </Map>
      </div>
    );
  }
}

MapContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  auth: makeSelectIsLoggedIn(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'mapContainer', saga });

export default compose(withConnect,GoogleApiWrapper({
  apiKey: ('AIzaSyDcWbUdTmoYnBTmx4r-LTXfjXbvGaDmQdE')
}))(MapContainer);
