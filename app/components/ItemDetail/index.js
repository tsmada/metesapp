/**
*
* ItemDetail
*
*/

import React from 'react';
// import styled from 'styled-components';


class ItemDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
      test: {this.props.item}
      </div>
    );
  }
}

ItemDetail.propTypes = {

};

export default ItemDetail;
