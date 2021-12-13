import { makeStyles, Table, TableContainer } from "@material-ui/core";
import clsx from "clsx";
import { EmptyState, Loader, RenderGuard } from "components";
import { ListingBody } from "components/Listing/components";
import React, { Fragment } from "react";
import { ScrollBarStyles } from "utils/constants";

const useStyles = makeStyles(theme => ({
  scrollbar: {
    ...ScrollBarStyles,
  }
}));

const SimpleTable = (props) => {
  const { errorMsg, itemComponent, itemHeader, items, loading, tableClass } = props;
  const classes = useStyles();

  return (
    <Fragment>
      <RenderGuard renderIf={items.length > 0}>
        <TableContainer className={clsx(classes.scrollbar, tableClass)}>
          <Table>
            <ListingBody
              itemComponent={itemComponent}
              items={items}
              topRow={itemHeader}
            />
          </Table>
        </TableContainer>
      </RenderGuard>
      <Loader loading={loading} size={40} thickness={4} />
      <EmptyState active={!loading && items.length <= 0} message={errorMsg || "Nothing found here"} />
    </Fragment>
  );
};

SimpleTable.defaultProps = {
  errorMsg: "",
  tableClass: "",
  items: [],
  loading: false,
};

export default SimpleTable;