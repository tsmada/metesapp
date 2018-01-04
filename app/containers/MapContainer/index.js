/**
 *
 * MapContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom'
import { compose } from 'redux';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { makeSelectIsLoggedIn, makeSelectForeclosureMarkers } from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import AppBarMUI from 'components/AppBar';
import { handleGetForeclosureMarkers } from 'containers/App/actions';

import injectSaga from 'utils/injectSaga';
import saga from './saga';

const style = {
  width: '100%',
  overflow: 'none',
  height: '100%'
}

export class MapContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props, context) {
    super(props, context);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
  }

  componentDidMount() {
    this.props.onLoad();
  }

   componentDidUpdate() {
    }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onInfoWindowClose = () => {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    })
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  render() {

    const { loaded, markers } = this.props;

    if (!loaded && markers.length > 0) {
      return <div>Loading...</div>
    }
    return (
      <div>
      <AppBarMUI title="Mapview" auth={this.props.auth}/>
      <Map google={this.props.google}
          initialCenter={{lat: 30.3, lng: -81.3}}
          style={{width: '100%', height: '100%', position: 'relative'}}
          className={'map'}
          onReady={this.onReady}
          zoom={10}
          onClick={this.onMapClicked}>
          <Marker
          onClick={this.onMarkerClick}
          name={'SOMA'}
          position={{lat: 30.3, lng: -81.7}} />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
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
  markers: makeSelectForeclosureMarkers(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoad: () => {
      dispatch(handleGetForeclosureMarkers());
    },
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'mapContainer', saga });

export default compose(withConnect, withSaga,
  GoogleApiWrapper({
  apiKey: ('AIzaSyDcWbUdTmoYnBTmx4r-LTXfjXbvGaDmQdE')
}))(MapContainer);
