/**
*
* ItemDetailCard
*
*/

import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
// import styled from 'styled-components';


class ItemDetailCard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Card expanded="false">
        <CardHeader
          title={this.props.cardHeaderTitle}
          subtitle={this.props.cardHeaderSubtitle}
          actAsExpander={false}
          showExpandableButton={false}
        />
        <CardText>
        </CardText>
        <CardMedia
          expandable={false}
          overlay={<CardTitle title={this.props.cardMediaTitle} subtitle={this.props.cardMediaSubtitle} />}
        >
        </CardMedia>
        <CardTitle title={this.props.cardTitle} subtitle={this.props.cardSubtitle} expandable={false} />
        <CardText expandable={false}>
          {this.props.cardText}
        </CardText>
      </Card>
    );
  }
}

ItemDetailCard.propTypes = {

};

export default ItemDetailCard;
