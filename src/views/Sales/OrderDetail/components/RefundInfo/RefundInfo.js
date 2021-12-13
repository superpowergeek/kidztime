import React, { Fragment, useEffect, useState } from "react";
import {
  makeStyles,
  Paper,
  TableContainer,
  Table,
  Typography,
  Box,
} from "@material-ui/core";
import { EmptyState, ErrorMessage, Loader, RenderGuard } from "components";
import { ListingHead, ListingBody } from "components/Listing/components";
import { fields } from "./refundInfoConfig";
import { OrderListItem, OrderSubtotal } from "./components";
import useApi from "utils/api/useApi";
import { useAsyncTask } from "utils/tools";
import useFilter from "utils/filter/useFilter";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: " 0 0 0 1px rgb(63 63 68 / 5%), 0 1px 3px 0 rgb(63 63 68 / 15%)",
    borderRadius: "4px",
    backgroundColor: "#FFFFFF",
    padding: theme.spacing(2, 2, 4, 2),
  },
  title: {
    marginBottom: 20,
  },
}));

const RefundInfo = (props) => {
  const { id } = props;

  const name = "order_items";
  const api = useApi();
  const classes = useStyles();

  const [orderItems, setOrderItems] = useState([]);
  const [runGetItems, load, error] = useAsyncTask(`${name}ListLoad`);
  const [filter, updateFilter] = useFilter(name);

  useEffect(() => {
    if (id) {
      runGetItems(async () => {
        const response = await api
          .path("order/item/list", { order_id: id })
          .get();
        if (response?.data?.result) {
          let items = response.data.result?.models || [];
          let count = response.data.result.meta?.count || 0;
          if (filter) {
            updateFilter({ ...filter, count: count });
          }
          setOrderItems(items);
        }
      });
    }
  }, [id]); // eslint-disable-line

  return (
    <Fragment>
      <Box className={classes.root}>
        <Typography variant="h4" className={classes.title}>
          Refunded Items
        </Typography>
        <Paper>
          <TableContainer>
            <Table size="medium">
              <ListingHead
                sortHead={true}
                name={name}
                fields={fields}
                hasCheck={false}
              />
              <RenderGuard renderIf={!load}>
                <ListingBody
                  bottomRow={OrderSubtotal}
                  itemComponent={OrderListItem}
                  items={orderItems}
                />
              </RenderGuard>
            </Table>
          </TableContainer>
          <Loader loading={load} size={40} thickness={4} />
          <EmptyState
            active={!load && orderItems.length <= 0}
            message="Sorry, there doesn't seem to be any items associated with this order."
          />
          <ErrorMessage error={error?.message} />
        </Paper>
      </Box>
    </Fragment>
  );
};

export default RefundInfo;
