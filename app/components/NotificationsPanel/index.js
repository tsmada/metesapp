/**
*
* NotificationsPane
*
*/

import React from 'react';
import { withStyles } from 'material-ui/styles';
import Menu, { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
// import styled from 'styled-components';

var styles = (theme) => ({
    notificationPanel: {
        zIndex: 81,
        transform: 'translateY(4px)',
        top: '45px',
        tabindex: -1,
        left: '728px',
    },
    container: {
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      maxWidth: '448px',
      minWidth: '448px',
      maxHeight: '530px',
      overflowX: 'hidden',
    },
    popup: {
      padding: '8px 8px 0',
      width: '100%',
    },
    panelcenter: {
      maxHeight: '512px',
      minHeight: '160px',
      transition: 'max-height .3s cubic-bezier(0.4,0,0.2,1)',
    },
    titlebarRow: {
      position: 'relative',
      flexDirection: 'row',
      display: 'flex',
    },
    notificationTitle: {
      borderBottom: '1px solid transparent',
      boxSizing: 'border-box',
      fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
      fontSize: '15px',
      fontWeight: '400',
      lineHeight: '24px',
      minHeight: '24px',
      paddingBottom: '8px',
      paddingTop: '7px',
      fontWeight: '500',
    },
    spacer: {
      width: '150px',
    },
    panelContent: {
      display: 'block',
      position: 'relative',
      overflow: 'auto',
      backgroundColor: '#f5f5f5',
      margin: '0 auto',
      paddingBottom: '8px',
    },
    card: {
      color: 'rgba(0,0,0,0.87)',
      backgroundColor: 'rgb(255,255,255)',
      borderRadius: '2px',
      display: 'flex',
      margin: '8px',
      boxShadow: '0 1px 3px 0 rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12)',
    },
    cardContent: {
      backgroundColor: '#fff',
      color: '#000',
      paddingBottom: '8px',
      paddingTop: '8px',
      display: 'block',
      padding: '16px',
    },
    cardTitle: {
      boxSizing: 'border-box',
      fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
      fontSize: '13px',
      lineHeight: '20px',
      minHeight: '24px',
      paddingBottom: '1px',
      paddingTop: '2px',
      borderBottom: '1px solid transparent',
      fontWeight: '400',
      fontWeight: '500',
      display: 'inline-block',
    },
    cardMessage: {
      boxSizing: 'border-box',
      fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
      fontSize: '13px',
      lineHeight: '20px',
      minHeight: '24px',
      paddingBottom: '1px',
      paddingTop: '2px',
      borderBottom: '1px solid transparent',
      fontWeight: '400',
    },
    actionButtonRow: {
      marginTop: '8px',
      margin: '0 8px 0 -8px',
      marginBottom: '0px',
    },
    notificationButton: {
      
    },
})


class NotificationsPanel extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { classes, open, onClick } = this.props;
    return (
      <Menu className={classes.notificationPanel} open={open}>
        <div className={classes.container}>
          <div className={classes.popup}>
            <div className={classes.panelcenter}>
              <div className={classes.titlebarRow}>
                <div className={classes.spacer}></div>
                <div className={classes.notificationTitle}>Notifications</div>
              </div>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <div className={classes.cardTitle}>
                    Complete Bidder Qualification
                  </div>
                  <div className={classes.cardMessage}>
                    You must first qualify your profile with your income level for SEC reporting purposes.
                  </div>
                  <div className={classes.actionButtonRow}>
                    <Button dense color="primary">
                      ADJUST PROFILE
                    </Button>
                    <Button dense color="primary">
                      DISMISS
                    </Button>
                    <Button dense color="primary">
                      LEARN MORE
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Menu>
    );
  }
}

NotificationsPanel.propTypes = {

};

export default withStyles(styles)(NotificationsPanel);
