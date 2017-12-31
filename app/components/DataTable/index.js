import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router'
import saga from './saga';
import { createStructuredSelector } from 'reselect';
import { makeSelectListings, makeSelectLoading, makeSelectError, makeSelectRowsPerPage,
makeSelectPageNumber, makeSelectChangeSortOrder, makeSelectChangeSortDirection,
makeSelectSelected } from 'containers/App/selectors';
import { loadListings, setSelectedItem, changeRowsPerPage, changePage,
handleRequestSort, handleSelectAllClick, handleSelectItem, loadDetail } from 'containers/App/actions';
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
import DeleteIcon from 'material-ui-icons/Delete';
import injectSaga from 'utils/injectSaga';
import FilterListIcon from 'material-ui-icons/FilterList';
import { compose } from 'redux';
import { connect } from 'react-redux';

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
          color: theme.palette.secondary.A700,
          backgroundColor: theme.palette.secondary.A100,
        }
      : {
          color: theme.palette.secondary.A100,
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
  const { numSelected, classes } = props;

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
          <Typography type="title">Nutrition</Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
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
  }

  componentDidMount() {
    this.props.onLoad();
  }

  handleRequestSort = (event, property) => {
    console.log(event, property);
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
    console.log(event, checked)
    if (checked) {
      let checkedRows = this.props.data.map(n => n.fcl_id);
      console.log(checkedRows)
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
    console.log('handleCheckbox');
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

  isSelected = id => this.props.selected.indexOf(id) !== -1;

  render() {
    const { classes, rowsPerPage, data, page, orderBy, order, selected, history } = this.props;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    const allRows = Array.apply(null, {length: data.length}).map(Number.call, Number);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} />
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
  }
};

const withConnect = connect(mapStateToProps,mapDispatchToProps);
const withSaga = injectSaga({ key: 'dashboardPage', saga });

export default compose(
  withStyles(styles),
  withSaga,
  withConnect,
)(EnhancedTable);