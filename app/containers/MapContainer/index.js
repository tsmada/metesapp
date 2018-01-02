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
       <Map google={this.props.google}
        style={{width: '100%', height: '100%', position: 'relative'}}
        className={'map'}
        zoom={14}>
      <Marker
        title={'The marker`s title will appear as a tooltip.'}
        name={'SOMA'}
        position={{lat: 37.778519, lng: -122.405640}} />
      </Map>
    );
  }
}

MapContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);
const withSaga = injectSaga({ key: 'mapContainer', saga });

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDcWbUdTmoYnBTmx4r-LTXfjXbvGaDmQdE')
})(MapContainer);
