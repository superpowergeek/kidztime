import {
  EmptyState,
  ErrorMessage,
  Loader,
  Page,
  RenderGuard,
} from "components";
import React, { Fragment } from "react";
import useGetDetail from "utils/customhooks/useGetDetail";
import { Grid } from "@material-ui/core";
import {
  OrderAction,
  RefundInfo,
  ShippingInfo,
  CustomerInfo,
  OrderInformation,
  AfterSales,
  IncomeSummary,
} from "./components";
import { pagesNav } from "./orderDetailConfig";

const OrderDetail = () => {
  const [model, loading, error, reload] = useGetDetail(
    "order/detail",
    "orders",
    "order_id"
  );

  return (
    <Fragment>
      <Page title="Order Details" dashboard={true} pagesNav={pagesNav}>
        <RenderGuard renderIf={model}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <OrderAction model={model} reload={reload} />
            </Grid>
            <Grid item xs={12}>
              <ShippingInfo model={model} />
            </Grid>
            <Grid item xs={12}>
              <CustomerInfo model={model} />
            </Grid>
            <Grid item xs={12}>
              <OrderInformation id={model?.id} model={model} />
            </Grid>
            <Grid item xs={12}>
              <RefundInfo id={model?.id} />
            </Grid>
            <Grid item xs={12}>
              <IncomeSummary id={model?.id} />
            </Grid>
            <Grid item xs={12}>
              <AfterSales id={model?.id} />
            </Grid>
          </Grid>
        </RenderGuard>
        <RenderGuard renderIf={!model}>
          <Loader loading={loading} size={40} thickness={4} />
          <ErrorMessage message={error?.message} />
          <EmptyState
            active={!loading && !model}
            message="Sorry, we couldn't find an order with this ID. Please check if this order still exists"
          />
        </RenderGuard>
      </Page>
    </Fragment>
  );
};

export default OrderDetail;
