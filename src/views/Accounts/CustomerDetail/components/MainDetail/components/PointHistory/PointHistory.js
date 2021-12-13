import { Listing } from "components";
import React, { Fragment, useEffect } from "react";
import { useFilter } from "utils/filter";
import { fields } from "./pointHistoryConfig";
import PointHistoryItem from "./PointHistoryItem";

const PointHistory = (props) => {
  const { id } = props;
  const name = "point_history";

  const [filter, updateFilter] = useFilter(name);

  useEffect(() => {
    if (id) {
      let campaign = process.env.REACT_APP_LOYALTY_CAMPAIGN;
      const default_campaign = "Loyalty_rewards";
      if (!campaign) console.log(`loyalty rewards campaign name not defined, using default: ${default_campaign}`);
      updateFilter({ ...filter, campaign: process.env.REACT_APP_LOYALTY_CAMPAIGN || default_campaign });
    }
  }, [id]); // eslint-disable-line

  return (
    <Fragment>
      <Listing
        name={name}
        path="account/redemptions"
        params={{ account_id: id }}
        fields={fields}
        dense={false}
        pageRow={true}
        hasCheck={false}
        sortable={false}
        itemComponent={PointHistoryItem}
        errorMsg="Sorry, we cannot find any orders for this customer."
      />
    </Fragment>
  );
};

export default PointHistory;