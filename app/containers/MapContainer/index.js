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
import { makeSelectIsLoggedIn, makeSelectForeclosureMarkers, makeSelectCurrentUser } from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import AppBarMUI from 'components/AppBar';
import { handleGetForeclosureMarkers, handleUserLogout } from 'containers/App/actions';
import root from 'window-or-global';

import injectSaga from 'utils/injectSaga';
import saga from './saga';

const style = {
  width: '100%',
  overflow: 'none',
  height: '100%'
}

const Container = (props) => {
  let addressStub = '';
  return (
    <div>
      <Map google={props.google} initialCenter={{lat: 30.3, lng: -81.7}} zoom={11}
      onClick={props.onMapClicked}
      >
        {
          props.markers.map((report, index) => (
            addressStub = report.propertyaddress.replace(/[\s]/g, '-'),
            <Marker
              key={report.fcl_id}
              id={report.fcl_id}
              title={report.propertyaddress}
              name={report.casenumber}
              link={`/dash/detail/${report.fcl_id}/${addressStub}-${report.propertycity}-${report.state}-${report.propertyzip}`}
              onClick={props.onClick}
              position={{lat: parseFloat(report.lat), lng: parseFloat(report.lon)}} />
          ))
        }
      </Map>
    </div>
  );
};

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
    if (this.props.markers.size === 0 || this.props.markers.length === 0) {
    this.props.onLoad();
  }
  }

   componentDidUpdate() {
    }

  onMarkerClick = (props, marker, e) => {
     this.props.router.push(props.link);
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

  onReady = () => {
  }

  render() {

    const { loaded, markers, google, map, position  } = this.props;

    if (!loaded && markers.size === 0) {
      return <div>Loading...</div>
    }
    return (
      <div>
      <AppBarMUI title="Dash" auth={this.props.auth} username={this.props.username}
        history={this.props.router} logout={this.props.handleLogout}/>
          <Container onMapClicked={this.onMapClicked} onClick={this.onMarkerClick} {...this.props}/>
          <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
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
  username: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoad: () => {
      dispatch(handleGetForeclosureMarkers());
    },
    handleLogout: (username) => {
      dispatch(handleUserLogout(username));
    },
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'mapContainer', saga });
const withComponent = GoogleApiWrapper({
  apiKey: ('AIzaSyDcWbUdTmoYnBTmx4r-LTXfjXbvGaDmQdE')
})(MapContainer)

export default 
connect(mapStateToProps, mapDispatchToProps)(withComponent);

