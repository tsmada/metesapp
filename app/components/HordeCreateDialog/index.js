import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';

const styles = theme => ({
  root: {
    paddingRight: 2,
    width: '100%',
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.primary.A700,
          backgroundColor: theme.palette.secondary.A400,
        }
      : {
          color: theme.palette.secondary.A700,
          backgroundColor: theme.palette.secondary.A700,
        },
  spacer: {
    flex: '1 1 100%',
  },
  underwater: {
    color: 'red',
  },
  good: {
    color: 'green',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

class HordeCreateDialog extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      type: 'Public',
      buyin: 100,
      amountRemaining: 0,
    }
  }


  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { fullScreen, open, handleClose, handleClickOpen, classes, listing,
    cancelButton, agreeButton } = this.props;
    //console.log(this.props.listing)
    if (listing) {
      var underwater = (parseInt(this.props.listing.assessedvalue) < parseInt((this.props.listing.maxbid - this.state.buyin)))
      ? <div>Property Underwater!</div>
      : <div>Good to go</div>
      const fundraising = (parseInt(this.props.listing.assessedvalue) < parseInt((this.props.listing.maxbid - this.state.buyin)))
      ? <div className={classes.underwater}>{this.props.listing.maxbid - this.state.buyin}</div>
      : <div className={classes.good}>{this.props.listing.maxbid - this.state.buyin}</div>
    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="create-horde-dialog"
        >
          <DialogTitle id="create-horde-dialog">{"Create Horde"}</DialogTitle>
          <DialogContent>
            <InputLabel htmlFor="membership-type">Membership Type  </InputLabel>
            <Select
              value='public'
              input={<Input name="membership-type" id="membership-type" readOnly />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value='public'>Public</MenuItem>
              <MenuItem value='private'>Private</MenuItem>
            </Select>
            </DialogContent>
            <DialogContent>
            <InputLabel htmlFor="horde-type">Default Horde Member Deposit  </InputLabel>
            <Select
              value={this.state.buyin}
              input={<Input name="buyin" id="horde-type"/>}
              onChange={this.handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={100}>$100.00</MenuItem>
              <MenuItem value={1000}>$1,000.00</MenuItem>
              <MenuItem value={10000}>$10,000.00</MenuItem>
            </Select>
          </DialogContent>
          <DialogContent>
          <InputLabel htmlFor="plaintiff-max-bid">Plaintiff's Max Bid  </InputLabel>{this.props.listing.maxbid}
          </DialogContent>
          <DialogContent>
          <InputLabel htmlFor="initial-deposit">Your Deposit  </InputLabel> {this.state.buyin} -
          </DialogContent>
          <DialogContent>
          <InputLabel htmlFor="estimated-horde-size">Estimated Horde Size  </InputLabel>{(this.props.listing.maxbid - this.state.buyin) / this.state.buyin}
          </DialogContent>
          <DialogContent>
          <InputLabel htmlFor="assessed-value">Assessed Value  </InputLabel> {this.props.listing.assessedvalue}
          </DialogContent>
          <DialogContent>
          <InputLabel htmlFor="amount-remaining">Fundraising Remaining  </InputLabel> {fundraising}
          </DialogContent>
          <DialogContent> 
          <InputLabel htmlFor="investment-status">Property Status  </InputLabel> {underwater}
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelButton} color="primary">
              Disagree
            </Button>
            <Button onClick={agreeButton} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  } else {
    return null;
  }
  }
}

HordeCreateDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default  withStyles(styles)(HordeCreateDialog);