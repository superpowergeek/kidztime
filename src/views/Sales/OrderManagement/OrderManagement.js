import { Listing, Page, SearchBar } from "components";
import React from "react";
import { OrderItem } from "./components";
import { fields, pagesNav } from "./orderMgmtConfig";

const OrderManagement = (props) => {

  const name = "orders";

  return (
    <Page title="Order Management" dashboard={true} pagesNav={pagesNav}>
      <Listing
        name={name}
        path="order/list"
        fields={fields}
        dense={true}
        pageRow={true}
        hasCheck={true}
        topElement={
          <SearchBar name={name} placeholder="Search Order Reference" />
        }
        itemComponent={OrderItem}
        errorMsg="Sorry, we cannot find any orders. Please try searching again or check in again later."
      />
    </Page>
  );
}

export default OrderManagement;