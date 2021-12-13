import { Listing } from "components";
import React, { Fragment, useEffect } from "react";
import { useFilter } from "utils/filter";
import { fields } from "./orderHistoryConfig";
import OrderHistoryItem from "./OrderHistoryItem";

const OrderHistory = (props) => {
  const { id } = props;
  const name = "order_history";

  const [filter, updateFilter] = useFilter(name);

  useEffect(() => {
    if (id) {
      updateFilter({ ...filter, account_id: id });
    }
  }, [id]); // eslint-disable-line

  return (
    <Fragment>
      <Listing
        name={name}
        path="order/list"
        fields={fields}
        dense={false}
        pageRow={true}
        hasCheck={false}
        sortable={false}
        itemComponent={OrderHistoryItem}
        errorMsg="Sorry, we cannot find any orders for this customer."
      />
    </Fragment>
  );
};

export default OrderHistory;