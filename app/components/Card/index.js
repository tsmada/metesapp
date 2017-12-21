/**
*
* Card
*
*/

import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from 'material-ui/styles';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import styled from 'styled-components';

const style = {
  display: 'flex',
}

const muiTheme = {
  display: 'flex',
}

class CardView extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
      <Card>
    <CardHeader
      title={this.props.title}
      subtitle={this.props.subtitle}
      avatar={this.props.avatarimgpath}
    />
    <CardMedia
      overlay={<CardTitle title={this.props.overlayTitle} subtitle={this.props.overlaySubtitle} />}
    >
      <img src={this.props.imgpath} alt="" />
    </CardMedia>
    <CardTitle title={this.props.cardTitle} subtitle={this.props.cardSubtitle} />
    <CardText>
      {this.props.cardText}
    </CardText>
  </Card>
  </MuiThemeProvider>
      </div>
    );
  }
}

Card.propTypes = {

};

export default CardView;
