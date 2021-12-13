import { Box } from "@material-ui/core";
import { ButtonGroup, Listing, Page } from "components";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "store";
import { CreateNavigationItem, NavigationItem } from "./components";
import { buttonConfig, fields, pagesNav } from "./navigationItemsConfig";

const Navigation = (props) => {
  const name = "navigation";

  const [openCreate, setOpenCreate] = useState(false);
  const dispatch = useDispatch();


  const onCreate = () => {
    setOpenCreate(false);
    dispatch(Actions.Filter.reload({ key: name }));
  }

  buttonConfig.create.onClick = () => setOpenCreate(true);

  return (
    <Page title="Navigation Items" dashboard={true} pagesNav={pagesNav}>
      <Listing
        name={name}
        path="objectmeta/banner/list"
        fields={fields}
        dense
        pageRow
        hasCheck
        omitFalsyParams
        topElement={
          <Box padding={2} display="flex" justifyContent="flex-end">
            <ButtonGroup
              buttons={buttonConfig}            
            />
          </Box>
        }
        noListMeta
        itemComponent={NavigationItem}
        errorMsg="Sorry, we couldn't find any customised pages. Please add some customised pages or try searching again."
      />
      <CreateNavigationItem
        open={openCreate}
        handleClose={() => onCreate()}
      />
    </Page>
  );
}

export default Navigation;