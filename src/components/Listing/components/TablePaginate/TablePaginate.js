import React from "react";
import { makeStyles, Grid, TablePagination } from "@material-ui/core";
import { RenderGuard } from "components";
import { useFilter } from "utils/filter";
import { resultLimit, showPaginate } from "utils/tools";

const useStyles = makeStyles(theme => ({
  paginator: {
    padding: "10px 16px",
    [theme.breakpoints.only("xs")]: {
      display: "block",
    },
  },
  pager: {
    paddingLeft: 0,
    overflowX: "auto",
    [theme.breakpoints.only("xs")]: {
      marginTop: 12,
    },
  },
  spacer: {
    [theme.breakpoints.only("xs")]: {
      flex: "none",
    },
  }
}));

const TablePaginate = (props) => {

  const { count, name, loading } = props;

  const classes = useStyles();
  const [filter, updateFilter] = useFilter(name);
  const page = filter ? Math.floor(filter.offset / filter.limit) : 0;
  const rowsPerPage = filter ? filter.limit : 0;

  const handleChangePage = (event, page) => {
    const new_offset = Math.floor(rowsPerPage * page);
    if (filter) {
      updateFilter({ ...filter, offset: new_offset });
    }
  };

  const handleChangeRowsPerPage = event => {
    const rows_per_page = event.target.value;
    if (filter) {
      updateFilter({ ...filter, limit: rows_per_page });
    }
  };

  return (
    <RenderGuard renderIf={!loading}>
      <Grid container justify="space-between" alignItems="center" className={classes.paginator}>
        <RenderGuard renderIf={filter.count > 0 && count > 0}>
          Showing {filter.offset + 1} - {resultLimit(filter.offset, filter.limit, filter.count)} of {filter.count} results
        </RenderGuard>
        <RenderGuard renderIf={showPaginate(filter.count, filter.limit)}>
          <TablePagination component="div"
            count={filter.count}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            classes={{
              toolbar: classes.pager,
              spacer: classes.spacer,
            }}
          />
        </RenderGuard>
      </Grid>
    </RenderGuard>
  );

};

export default TablePaginate;