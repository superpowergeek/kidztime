import React, { Fragment, useState } from "react";
import { makeStyles, TableCell, TableSortLabel } from "@material-ui/core";
import { useFilter } from "utils/filter";

const useStyles = makeStyles(theme => ({
  cell: {
    cursor: "pointer",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  }
}));

const parseFilter = (filter) => {
  let sort = filter.sort || "";
  if (sort.length === 0 || sort.indexOf(":") < 0) {
    return null;
  } else {
    if (sort.indexOf("desc") > -1) {
      return "desc";
    } else {
      return "asc";
    }
  }
};

const TableSort = (props) => {

  const { sortable, idTag, name, header } = props;
  const [filter, updateFilter] = useFilter(name);
  const [order, setOrder] = useState(parseFilter(filter));

  const classes = useStyles();

  const changeSort = (id, sortable) => {
    if (sortable) {
      let tag;
      if (order === "asc") {
        setOrder("desc");
        tag = `${id}:desc`;
      } else {
        setOrder("asc");
        tag = `${id}:asc`;
      }
      updateFilter({ ...filter, sort: tag });
    }
  };

  const returnSort = (filter) => {
    const filterArr = filter.sort.split(":");
    return filterArr[0];
  }

  return (
    <TableCell
      className={classes.cell}
      onClick={sortable && header.sortable ? () => changeSort(idTag, sortable) : null}
      sortDirection={returnSort(filter) === idTag ? order : false}
      align={header.align}
    >
      {
        sortable && header.sortable ?
          <TableSortLabel
            active={returnSort(filter) === idTag}
            direction={returnSort(filter) === idTag ? order : 'asc'}
          >
            {header.label}
            {
              returnSort(filter) === idTag ? (
                <span className={classes.visuallyHidden}>
                  { order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null
            }
          </TableSortLabel> :
          <Fragment>
            {header.label}
          </Fragment>
      }
    </TableCell>
  );
};

TableSort.defaultProps = {
  align: "left",
};

export default TableSort;