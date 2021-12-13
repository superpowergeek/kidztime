import { Listing, Page, SearchBar } from "components";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "store";
import { CreateCustomisedPage, CustomisedPage } from "./components";
import { buttonConfig, fields, pagesNav } from "./customPagesConfig";

const CustomPages = (props) => {
  const name = "pages";

  const [openCreate, setOpenCreate] = useState(false);
  const dispatch = useDispatch();


  const onCreate = () => {
    setOpenCreate(false);
    dispatch(Actions.Filter.reload({ key: name }));
  }

  buttonConfig.create.onClick = () => setOpenCreate(true);

  return (
    <Page title="Customised Pages" dashboard={true} pagesNav={pagesNav}>
      <Listing
        name={name}
        path="frontend/webpage/list"
        fields={fields}
        dense
        pageRow
        hasCheck
        omitFalsyParams
        topElement={
          <SearchBar name={name} placeholder="Search Customised Pages" buttons={buttonConfig} />
        }
        itemComponent={CustomisedPage}
        errorMsg="Sorry, we couldn't find any customised pages. Please add some customised pages or try searching again."
      />
      <CreateCustomisedPage
        open={openCreate}
        handleClose={() => onCreate()}
      />
    </Page>
  );
}

export default CustomPages;