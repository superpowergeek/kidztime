import React from "react";
import { Listing, Page } from "components";
import { OrderItem } from "./components";
import { fields, pagesNav } from "./orderOvConfig";
import TopElements from "./components/TopElements";
import ButtonMass from "./components/ButtonMass";

const OrderOverview = (props) => {
  const name = "orders";
  return (
    <Page title="Order OverView" dashboard={true} pagesNav={pagesNav}>
      <Listing
        name={name}
        path="order/list"
        fields={fields}
        dense={true}
        pageRow={true}
        hasCheck={true}
        topElement={
          <React.Fragment>
            <TopElements name={name} />
            <ButtonMass />
          </React.Fragment>
        }
        itemComponent={OrderItem}
        errorMsg="Sorry, we cannot find any orders. Please try searching again or check in again later."
      />
    </Page>
  );
};

export default OrderOverview;
