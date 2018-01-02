import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router'
import saga from './saga';
import { createStructuredSelector } from 'reselect';
import { makeSelectListings, makeSelectLoading, makeSelectError, makeSelectRowsPerPage,
makeSelectPageNumber, makeSelectChangeSortOrder, makeSelectChangeSortDirection,
makeSelectSelected, makeSelectDownload } from 'containers/App/selectors';
import { loadListings, setSelectedItem, changeRowsPerPage, changePage,
handleRequestSort, handleSelectAllClick, handleSelectItem, loadDetail,
handleDownloadItem, handleDownloadComplete } from 'containers/App/actions';
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
import GavelIcon from 'material-ui-icons/Gavel';
import StarIcon from 'material-ui-icons/Star';
import VisibilityOffIcon from 'material-ui-icons/VisibilityOff';
import injectSaga from 'utils/injectSaga';
import FilterListIcon from 'material-ui-icons/FilterList';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { CustomDialog } from 'components/Dialog';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';

var FileSaver = require('file-saver');


const columnData = [
  { id: 'saledate', numeric: false, disablePadding: true, label: 'Sale Date' },
  { id: 'propertyaddress', numeric: false, disablePadding: true, label: 'Property Address' },
  { id: 'propertyzip', numeric: false, disablePadding: true, label: 'Zip Code' },
  { id: 'propertyuse', numeric: false, disablePadding: true, label: 'Property Usage' },
  { id: 'assessedvalue', numeric: false, disablePadding: true, label: 'Assessed Value' },
  { id: 'finaljudgement', numeric: false, disablePadding: true, label: 'Final Judgement' },
  { id: 'maxbid', numeric: false, disablePadding: true, label: 'Plaintiff Max Bid' },
  { id: 'parcelid', numeric: false, disablePadding: true, label: 'Parcel ID' },
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
  const { numSelected, classes, selected, reportData, onDownload, createHorde,
  createOffer } = props;

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
      <Tooltip title="Hide Listings">
            <IconButton aria-label="Hide Listings">
              <VisibilityOffIcon />
            </IconButton>
          </Tooltip>
      </div>
      <div className={classes.action}>
      <Tooltip title="Make Offer">
            <IconButton aria-label="Make Offer" onClick={() => createOffer()}>
              <GavelIcon />
            </IconButton>
          </Tooltip>
      </div>
      <div className={classes.action}>
      <Tooltip title="Watch Listing">
            <IconButton aria-label="Watch Listing">
              <StarIcon />
            </IconButton>
          </Tooltip>
      </div>
      <div className={classes.action}>
      <Tooltip title="Create Horde">
            <IconButton aria-label="Create Horde" onClick={() => createHorde()}>
              <GroupAddIcon />
            </IconButton>
          </Tooltip>
      </div>
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Download">
            <IconButton aria-label="Download" onClick={() => onDownload(event, selected)}>
              <FileDownloadIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
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
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      createHordeDialogOpen: false,
      createOfferDialogOpen: false
    }
  }

  componentDidMount() {
    this.props.onLoad();
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
      this.props.handleSelectAllClick(checkedRows)
      return;
    }
    this.props.handleSelectAllClick([])
  };

  handleKeyDown = (event, id) => {
    if (keycode(event) === 'space') {
      this.handleClick(event, id);
    }
  };

  handleClick = (event, id) => {
    const { selected } = this.props;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected,id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    this.props.handleSelectItem(newSelected);
  };

  handleRowCheck = (event, id) => {
    if (event.target.type != 'checkbox') {
    this.props.history.push(`/dash/detail/${id}`);
  }
 };

 handleCreateHordeDialogToggle = () => {
  this.setState({createHordeDialogOpen: !this.state.createHordeDialogOpen})
 };

 handleCreateOfferDialogToggle = () => {
  this.setState({createOfferDialogOpen: !this.state.createOfferDialogOpen})
 };

 downloadSelected = (evt, selected) => {
    this.props.handleDownloadItem(selected);
    if (this.props.reportData.result){
      var blob = new Blob([this.props.reportData.result], {type: "text/plain;charset=utf-8"});
      FileSaver.saveAs(blob, "Foreclosure Export.txt");
    }
    this.props.handleDownloadComplete();
 };

  isSelected = id => this.props.selected.indexOf(id) !== -1;

  render() {
    const { classes, rowsPerPage, data, page, orderBy, order, selected, history, reportData } = this.props;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    const allRows = Array.apply(null, {length: data.length}).map(Number.call, Number);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} onDownload={this.downloadSelected} selected={selected}
        reportData={reportData} createHorde={this.handleCreateHordeDialogToggle} 
        createOffer={this.handleCreateOfferDialogToggle}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                const isSelected = this.isSelected(n.fcl_id);
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    onClick={event => this.handleRowCheck(event, n.fcl_id)}
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.fcl_id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected} onClick={event => this.handleClick(event, n.fcl_id)} />
                    </TableCell>
                    <TableCell>{n.saledate}</TableCell>
                    <TableCell>{n.propertyaddress}</TableCell>
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
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.props.handleChangePage}
                  onChangeRowsPerPage={this.props.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
          <Dialog fullScreen={false} open={this.state.createHordeDialogOpen}>
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
            <Button onClick={this.handleCreateHordeDialogToggle} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog fullScreen={false} open={this.state.createOfferDialogOpen}>
          <DialogTitle id="responsive-dialog-title">{"Place Bid?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please type in your Max Bid for this listing and proceed to Auction site.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCreateOfferDialogToggle} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleCreateOfferDialogToggle} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
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
});


function mapDispatchToProps(dispatch, ownProps) {
  return {
    onLoad: () => {
      dispatch(loadListings());
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
    handleSelectItem: (item) => {
      dispatch(handleSelectItem(item))
    },
    handleDownloadItem: (item) => {
      dispatch(handleDownloadItem(item))
    },
    handleDownloadComplete: () => {
      dispatch(handleDownloadComplete())
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