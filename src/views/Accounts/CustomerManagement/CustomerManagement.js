import { Listing, Page, SearchBar } from "components";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "store";
import { CreateDialog, CustomerItem } from "./components";
import { buttonConfig, fields, pagesNav } from "./customerConfig";

const CustomerManagement = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const dispatch = useDispatch();
  const name = "customers";

  const onCreate = () => {
    setOpenCreate(false);
    dispatch(Actions.Filter.reload({ key: name }));
  }

  buttonConfig.create.onClick = () => setOpenCreate(true);

  useEffect(() => {
    // if (router.history.location.state?.delete) {
    //   setAlert(true);
    // }
  }, [])

  return (
    <Page title="Customers List" dashboard={true} pagesNav={pagesNav}>
      <Listing
        name={name}
        path="account/list"
        fields={fields}
        dense={true}
        pageRow={true}
        hasCheck={true}
        topElement={
          <SearchBar name={name} placeholder="Search Customer" buttons={buttonConfig} />
        }
        itemComponent={CustomerItem}
        errorMsg="Sorry, we cannot find any customers. Please add some accounts or try searching again."
      />
      <CreateDialog
        open={openCreate}
        handleClose={() => onCreate()}
      />

    </Page>
  );
};

export default CustomerManagement;
