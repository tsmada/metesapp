import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router'
import saga from './saga';
import { createStructuredSelector } from 'reselect';
import { makeSelectListings, makeSelectLoading, makeSelectError, makeSelectRowsPerPage,
makeSelectPageNumber, makeSelectChangeSortOrder, makeSelectChangeSortDirection,
makeSelectSelected, makeSelectDownload, makeSelectTableFilterBy, makeSelectTableFilter,
makeSelectCurrentUser, makeSelectFilteredItems, makeSelectRowCount,
makeSelectHiddenItems, makeSelectPools } from 'containers/App/selectors';
import { loadListings, setSelectedItem, changeRowsPerPage, changePage,
handleRequestSort, handleSelectAllClick, handleSelectItem, loadDetail,
handleDownloadItem, handleDownloadComplete, handleRequestFilter,
handleChangeRowCount, handleHideSelectedItems,
handleShowHiddenItems, loadPools, handleCreatePool } from 'containers/App/actions';
import { fromJS, Map, List } from 'immutable';
import keycode from 'keycode';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import FileDownloadIcon from 'material-ui-icons/CloudDownload';
import GroupAddIcon from 'material-ui-icons/GroupAdd';
import PersonAddIcon from 'material-ui-icons/PersonAdd';
import GavelIcon from 'material-ui-icons/Gavel';
import StarIcon from 'material-ui-icons/Star';
import VisibilityOffIcon from 'material-ui-icons/VisibilityOff';
import injectSaga from 'utils/injectSaga';
import FilterListIcon from 'material-ui-icons/FilterList';
import { compose } from 'redux';
import { connect } from 'react-redux';
import P from 'components/P';
import { CustomDialog } from 'components/Dialog';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import HordeCreateDialog from 'components/HordeCreateDialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import SimpleSnackbar from 'components/Snackbar';
import Workbook from 'react-xlsx-workbook';


const columnData = [
  { id: 'saledate', numeric: false, disablePadding: true, label: 'Sale Date' },
  { id: 'propertyaddress', numeric: false, disablePadding: true, label: 'Property Address' },
  { id: 'propertycity', numeric: false, disablePadding: true, label: 'Property City' },
  { id: 'state', numeric: false, disablePadding: true, label: 'Property State' },
  { id: 'propertyzip', numeric: false, disablePadding: true, label: 'Zip Code' },
  { id: 'propertyuse', numeric: false, disablePadding: true, label: 'Property Usage' },
  { id: 'assessedvalue', numeric: false, disablePadding: true, label: 'Assessed Value' },
  { id: 'finaljudgement', numeric: false, disablePadding: true, label: 'Final Judgement' },
  { id: 'maxbid', numeric: false, disablePadding: true, label: 'Plaintiff Max Bid' },
  { id: 'parcelid', numeric: false, disablePadding: true, label: 'Parcel ID' },
  ];

const countyData = [
  { id: 'duval', url: 'https://www.duval.realforeclose.com', labelname: 'Duval'},
  { id: 'clay', url: 'https://www.clay.realforeclose.com', labelname: 'Clay'},
  { id: 'hillsborough', url: 'https://www.hillsborough.realforeclose.com', labelname: 'Hillsborough'},
  { id: 'pinellas', url: 'https://www.pinellas.realforeclose.com', labelname: 'Pinellas'},
  { id: 'nassau', url: 'https://www.nassau.realforeclose.com', labelname: 'Nassau'},
  { id: 'saintjohns', url: 'https://www.clay.realforeclose.com', labelname: 'Saint Johns'}
  ];



class EnhancedTableHead extends React.Component {
  static propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  createFilterHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

const toolbarStyles = theme => ({
  root: {
    paddingRight: 2,
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
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes, selected, reportData, createHorde,
  createOffer, filterList, watchListing, data, hideSelected, wbData } = props;

  const workBookname = 'Foreclosure Export - ' + String(Date.now()) + '.xlsx'
  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography type="subheading">{numSelected} selected</Typography>
        ) : (
          <Typography type="title">Listings</Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.action}>
      {numSelected > 0 ? (
      <Tooltip title="Make Offer">
            <IconButton aria-label="Make Offer" onClick={createOffer}>
              <GavelIcon />
            </IconButton>
          </Tooltip>
      ) : null}
      </div>
      <div className={classes.action}>
      {numSelected > 0 ? (
      <Tooltip title="Watch Listing">
            <IconButton aria-label="Watch Listing" onClick={watchListing}>
              <StarIcon />
            </IconButton>
          </Tooltip>
      ) : null}
      </div>
      <div className={classes.action}>
      {numSelected > 0 ? (
      <Tooltip title="Create Investor Pool">
            <IconButton aria-label="Create Investor Pool" onClick={createHorde}>
              <GroupAddIcon />
            </IconButton>
          </Tooltip>
      ) : null }
      </div>
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Download">
            <IconButton aria-label="Download">
              <Workbook filename={workBookname} element={<FileDownloadIcon />}>
                <Workbook.Sheet data={wbData} name="Foreclosures">
                  <Workbook.Column label="State" value="state"/>
                  <Workbook.Column label="County" value="county"/>
                  <Workbook.Column label="Sale Date" value="saledate"/>
                  <Workbook.Column label="Property Address" value="propertyaddress"/>
                  <Workbook.Column label="Property City" value="propertycity"/>
                  <Workbook.Column label="Property Zip" value="propertyzip"/>
                  <Workbook.Column label="Property Use" value="propertyuse"/>
                  <Workbook.Column label="Assessed Value" value="assessedvalue"/>
                  <Workbook.Column label="Final Judgement" value="finaljudgement"/>
                  <Workbook.Column label="Plaintiff Max Bid" value="maxbid"/>
                  <Workbook.Column label="Parcel ID" value="parcelid"/>
                </Workbook.Sheet>
              </Workbook>
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list" onClick={filterList}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 800,
  },
  tableCell: {
    padding: '4px 56px 4px 24px',
    overflowX: 'auto',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      createHordeDialogOpen: false,
      createOfferDialogOpen: false,
      createFilterDialogOpen: false,
      snackbarOpen: false,
      snackbarContent: false,
      filterValue: '01/08/2018',
      filterBy: 'saledate',
      currentListing: false,
    }
  }

  componentDidMount() {
    this.props.onLoad();
  }

  componentDidUpdate(){
  }

  handleRequestTableFilter = (event, property) => {
    console.log('Table Filter Requested for Column: ', property)
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.props.orderBy === property && this.props.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.props.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.props.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.props.handleRequestSort(data, order, orderBy);
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      let checkedRows = this.props.data.map(n => n.fcl_id);
      if (this.props.filteredItems.length > 0){
        this.props.handleSelectAllClick(checkedRows)
        let fRows = this.props.filteredItems.map(n => n.fcl_id);
        let cRows = checkedRows.filter(e => !fRows.includes(e));
        this.props.handleSelectAllClick(cRows);
        return;
    } else {
        this.props.handleSelectAllClick(checkedRows)
        return;
    }
  }
    this.props.handleSelectAllClick([])
  };

  handleKeyDown = (event, id) => {
    if (keycode(event) === 'space') {
      this.handleClick(event, id);
    }
  };

  handleClick = (event, id) => {
    //console.log('handleclick() fired -- Previous Selection: ', this.props.selected)
    const selectedIndex = this.props.selected.indexOf(id);
    let newSelected = [];

    if (this.props.selected.size != 0) { // weird fix for immutableJS making a list in the first index of this.props.selected
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(this.props.selected,id)
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(this.props.selected.slice(1));
      } else if (selectedIndex === this.props.selected.length - 1) {
        newSelected = newSelected.concat(this.props.selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          this.props.selected.slice(0, selectedIndex),
          this.props.selected.slice(selectedIndex + 1),
        );
      }
  } else {
    newSelected = [id];
  }

    //console.log('handleclick() fired -- New Selection: ', newSelected)
    this.props.handleSelectItem(newSelected);
    this.props.data.forEach((item) => {
      if (item.fcl_id == id) {
        this.setState({
          currentListing: item,
        })
      }
    })
  };

  handleRowCheck = (event, n) => {
    if (event.target.type != 'checkbox') {
      const addressStub = n.propertyaddress.replace(/[\s]/g, '-')
    this.props.history.push(`/dash/detail/${n.fcl_id}/${addressStub}-${n.propertycity}-${n.state}-${n.propertyzip}`);
  }
 };

 handleCreateHordeDialogToggle = () => {
  this.setState({createHordeDialogOpen: !this.state.createHordeDialogOpen})
 };

 handleCreateHordeDialogConfirm = () => {
  var fAmt = this.props.data.filter((item) => {
    if (item.fcl_id === this.props.selected[0]) {
      return item;
    }
  })
  //console.log(this.props.username, this.props.selected[0], fAmt[0].maxbid, fAmt[0].assessedvalue)
  this.props.handleCreatePool(this.props.username, this.props.selected[0], fAmt[0].maxbid);
  this.setState({createHordeDialogOpen: !this.state.createHordeDialogOpen})
  this.setState({ snackbarOpen: true, snackbarContent: 'Horde Created'});
 };

 handleCreateOfferDialogToggle = () => {
  this.setState({createOfferDialogOpen: !this.state.createOfferDialogOpen})
 };

 handleWatchListing = () => {
  this.setState({ snackbarOpen: true, snackbarContent: 'Listing Watched'});
 }

 handleOfferNav = () => {
  //console.log('Naving to ', this.props.selected)
  this.props.data.map((item) => {
    if (item.fcl_id === this.props.selected[0]) {
      countyData.map((cd) => {
        if (cd.labelname === item.county) {
          window.open(cd.url, '_blank')
        }
      })
    }
  })
  this.setState({createOfferDialogOpen: !this.state.createOfferDialogOpen})
 };

 handleCreateFilterDialogToggle = () => {
  this.setState({createFilterDialogOpen: !this.state.createFilterDialogOpen})
 };

  handleSnackbarOpen = () => {
    this.setState({ snackbarOpen: true });
  };

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ snackbarOpen: false });
  };

 downloadSelected = (evt, selected) => {
 };

  isSelected = id => this.props.selected.indexOf(id) !== -1;
  isPooled = (id, index) => this.props.pools[index] ? this.props.pools[index].itemID.indexOf(id) !== -1 : false;

  handleSetFilter = (event, property) => {
    this.setState({filterBy: event.target.value});
  }

  handleSetFilterValue = (event, property) => {
    this.setState({filterValue: event.target.value});
  }

  hideSelected = () => {
    if (this.props.selected.length > 0){
        let mRows = this.props.data.map((n) => n.fcl_id);
        let cRows = mRows.filter(e => this.props.selected.includes(e));
        this.props.handleHideSelected(cRows);
        return;
  }
}

  confirmFilters = () => {
    let filteredValues = [];
    const data = this.props.data.map((n, i) => {
      // n[this.state.filterBy] === 01/08/2018
      // n[this.state.filter] === possibly undefined
      if (this.state.filterValue.indexOf(n[this.state.filterBy]) === 0) {
        filteredValues.push(n);
      };
    });
    this.setState({createFilterDialogOpen: false});
    this.setState({ snackbarOpen: true, snackbarContent: 'Filtered ' + filteredValues.length + ' listings.'});
    this.props.handleRequestFilter(filteredValues, this.state.filterValue, this.state.filterBy);
  }

  render() {
    const { classes, rowsPerPage, data, page, orderBy, order, selected, history, reportData,
    filterValue, filterBy, filteredItems, rowcount, hidden } = this.props;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    const wbData = selected.length > 0 ? data.filter((item) => {
    if (selected.indexOf(item.fcl_id) > 0) {
      //console.log(item, selected)
      return item;
    }
    }) : null;

    const RowCount = (this.props.filteredItems.length > 0)
    ? this.props.data.length - this.props.filteredItems.length
    : this.props.data.length;

    const FilterData = (this.props.filteredItems.length > 0)
    ? this.props.data.filter((item) => {
      if (this.props.filteredItems.indexOf(item) === -1) {
        return item;
      }
    })
    : this.props.data;

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} selected={selected}
        reportData={reportData} createHorde={this.handleCreateHordeDialogToggle} 
        createOffer={this.handleCreateOfferDialogToggle}
        filterList={this.handleCreateFilterDialogToggle}
        watchListing={this.handleWatchListing}
        data={FilterData}
        hideSelected={this.hideSelected}
        wbData={wbData}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              onRequestFilter={this.handleRequestTableFilter}
              rowCount={RowCount}
            />
            <TableBody>
              {FilterData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n,index) => {
                const isSelected = this.isSelected(n.fcl_id); // returns true when checked
                const isPooled = this.isPooled(n.fcl_id, index);
                //console.log(isPooled);
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    onClick={event => this.handleRowCheck(event, n)}
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.fcl_id}
                    selected={isSelected}
                    pooled={isPooled}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected} onClick={event => this.handleClick(event, n.fcl_id)} />
                    </TableCell>
                    <TableCell>{n.saledate}</TableCell>
                    <TableCell>{n.propertyaddress}</TableCell>
                    <TableCell>{n.propertycity}</TableCell>
                    <TableCell>{n.state}</TableCell>
                    <TableCell>{n.propertyzip}</TableCell>
                    <TableCell>{n.propertyuse}</TableCell>
                    <TableCell>{n.assessedvalue}</TableCell>
                    <TableCell>{n.finaljudgement}</TableCell>
                    <TableCell>{n.maxbid}</TableCell>
                    <TableCell>{n.parcelid}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={RowCount}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.props.handleChangePage}
                  onChangeRowsPerPage={this.props.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
          <Dialog fullScreen={false} open={false}>
          <DialogTitle id="responsive-dialog-title">{"Create Horde?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Create a pool of investors to purchase this property. The default buy-in is $100. Your income
              must be verified to proceed.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCreateHordeDialogToggle} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleCreateHordeDialogConfirm} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog fullScreen={false} open={this.state.createOfferDialogOpen}>
          <DialogTitle id="responsive-dialog-title">{"Place Bid?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You are leaving this site and being taken to the Auction Site. Most auctions require 5% deposited
              before the day of the sale and 100% payment by end of day. Please verify doc fees and stamp fees
              with your local clerk.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCreateOfferDialogToggle} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleOfferNav} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog fullScreen={false} open={this.state.createFilterDialogOpen}>
          <DialogTitle id="responsive-dialog-title">{"Create Filter"}</DialogTitle>
          <DialogContent>
            <form className={classes.container} autoComplete="off">
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="filterBy-simple">Column</InputLabel>
                  <Select
                    value={this.state.filterBy}
                    onChange={this.handleSetFilter}
                    input={<Input name="filterBy" id="filterBy-simple" />}
                    >
                    <MenuItem value="none">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'saledate'}>Sale Date</MenuItem>
                    <MenuItem value={'propertyaddress'}>Property Address</MenuItem>
                    <MenuItem value={'propertyzip'}>Zip Code</MenuItem>
                    <MenuItem value={'propertyuse'}>Property Usage</MenuItem>
                    <MenuItem value={'assessedvalue'}>Assessed Value</MenuItem>
                    <MenuItem value={'finaljudgement'}>Final Judgement</MenuItem>
                    <MenuItem value={'maxbid'}>Plaintiff Max Bid</MenuItem>
                    <MenuItem value={'parcelid'}>Parcel ID</MenuItem>
                  </Select>
                </FormControl>
                <P/>
                <FormControl className={classes.formControl}>
                <TextField
                id="filtervalue"
                label="Exclude Value"
                className={classes.textField}
                onChange={this.handleSetFilterValue}
                value={this.state.filterValue}
                margin="normal"
                />
                </FormControl>
                </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.confirmFilters} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <HordeCreateDialog open={this.state.createHordeDialogOpen} listing={this.state.currentListing}
        cancelButton={this.handleCreateHordeDialogToggle}
        agreeButton={this.handleCreateHordeDialogConfirm}
        />
        <SimpleSnackbar snackbarOpen={this.state.snackbarOpen} handleSnackbarClose={this.handleSnackbarClose}
        handleSnackbarOpen={this.handleSnackbarOpen} content={this.state.snackbarContent}/>

        </div>
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectListings(),
  rowsPerPage: makeSelectRowsPerPage(),
  page: makeSelectPageNumber(),
  orderBy: makeSelectChangeSortOrder(),
  order: makeSelectChangeSortDirection(),
  selected: makeSelectSelected(),
  reportData: makeSelectDownload(),
  filterValue: makeSelectTableFilter(),
  filterBy: makeSelectTableFilterBy(),
  username: makeSelectCurrentUser(),
  filteredItems: makeSelectFilteredItems(),
  rowcount: makeSelectRowCount(),
  hidden: makeSelectHiddenItems(),
  pools: makeSelectPools(),
});


function mapDispatchToProps(dispatch, ownProps) {
  return {
    onLoad: () => {
      dispatch(loadListings()),
      dispatch(loadPools())
    },
    handleHideSelected: (checked) => {
    dispatch(handleHideSelectedItems(checked))
    },
    handleShowHiddenItems: (checked) => {
    dispatch(handleShowHiddenItems(checked))
    },
    handleChangeRowsPerPage: (event) => {
    dispatch(changeRowsPerPage(event.target.value))
    },
    handleChangePage: (event, page) => {
    dispatch(changePage(page));
    },
    handleRequestSort: (data, order, orderBy) => {
    dispatch(handleRequestSort(data, order, orderBy))
    },
    handleSelectAllClick: (checked) => {
    dispatch(handleSelectAllClick(checked))
    },
    handleCreatePool: (username, item, maxbid) => {
      dispatch(handleCreatePool(username, item, maxbid))
    },
    handleSelectItem: (item) => {
      dispatch(handleSelectItem(item))
    },
    handleDownloadItem: (item) => {
      dispatch(handleDownloadItem(item))
    },
    handleDownloadComplete: () => {
      dispatch(handleDownloadComplete())
    },
    handleRequestFilter: (data, filter, filterBy) => {
      dispatch(handleRequestFilter(data, filter, filterBy))
    },
    handleRowCount: (rowCount) => {
      dispatch(handleChangeRowCount(rowCount))
    },
  }
};

const withConnect = connect(mapStateToProps,mapDispatchToProps);
const withSaga = injectSaga({ key: 'dashboardPage', saga });

export default compose(
  withStyles(styles),
  withSaga,
  withConnect,
)(EnhancedTable);