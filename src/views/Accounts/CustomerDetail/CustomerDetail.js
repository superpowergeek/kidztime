import React from "react";
import { Grid } from "@material-ui/core";
import useGetDetail from "utils/customhooks/useGetDetail";
import { pagesNav } from "./customerDetailConfig";
import { EmptyState, ErrorMessage, Loader, Page } from "components";
import { MainDetail, SideBoxDetail } from "./components";

const CustomerDetail = () => {

  const [user, loading, error, setUser] = useGetDetail("account/detail", "customers", "account_id");

  return (
    <Page title="Customer Details" dashboard={true} pagesNav={pagesNav}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ErrorMessage message={error?.message} />
          <Loader loading={loading} size={40} thickness={4} />
          <EmptyState active={!loading && !user} message="Sorry, we couldn't find a customer with this ID. Please check if this account still exists" />
        </Grid>
        <Grid item xs={12} sm={7} md={8} lg={9}>
          <MainDetail
            loading={loading}
            user={user}
          />
        </Grid>
        <Grid item xs={12} sm={5} md={4} lg={3}>
          <SideBoxDetail
            user={user}
            setUser={setUser}
            loading={loading}
          />
        </Grid>
      </Grid>
    </Page>
  );
};

export default CustomerDetail;