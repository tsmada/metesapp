/**
 *
 * RegistrationPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import RegistrationForm from 'components/RegistrationForm';

import { Helmet } from 'react-helmet';
import AppBarMUI from 'components/AppBar';

import Paper from 'material-ui/Paper';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectRegistrationPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';


const style = {
  display: 'flex',
};

export class RegistrationPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>RegistrationPage</title>
          <meta name="description" content="Description of RegistrationPage" />
        </Helmet>
        <AppBarMUI title="Registration" />
        <Paper style={style} zDepth={3}>
          <RegistrationForm />
        </Paper>
      </div>
    );
  }
}

RegistrationPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  registrationpage: makeSelectRegistrationPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'registrationPage', reducer });
const withSaga = injectSaga({ key: 'registrationPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RegistrationPage);
