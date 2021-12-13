import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { ErrorMessage, TopBox } from "components";
import useApi from "utils/api/useApi";
import { cashFormat } from "utils/formatting";
import useAsyncTask from "utils/tools/useAsyncTask";

const useStyles = makeStyles(theme => ({
  card: {
    marginLeft: theme.spacing(2),
    "&:first-child": {
      marginLeft: 0
    },
  }
}));

let mounted = false;

const OrderStats = (props) => {
  const { id } = props;
  const api = useApi();
  const classes = useStyles();

  const [orderTotal, setOrderTotal] = useState(0);
  const [orderNum, setOrderNum] = useState(0);
  const [runStats, load, error] = useAsyncTask("account-stats");

  const boxes = [
    {
      title: cashFormat(orderTotal),
      subtitle: "Total Order Value",
      loading: load,
    },
    {
      title: orderNum,
      subtitle: "Orders Till Date",
      loading: load,
    },
  ];

  useEffect(() => {
    mounted = true;
    if (id) {
      runStats(async () => {
        const response = await api.path("account/statistics", { account_id: id }).get();
        const { data: { result: { number_of_orders, total_order_value } } } = response;
        mounted && setOrderNum(number_of_orders);
        mounted && setOrderTotal(total_order_value);
      });
    }
    return () => mounted = false;
  }, [id]); // eslint-disable-line

  return (
    <Fragment>
      <ErrorMessage message={error?.message} />
      { boxes.map((box, id) =>
        <TopBox box={box} cardClass={classes.card} key={id} />
      )}
    </Fragment>
  );
};

export default OrderStats;