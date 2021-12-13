import { Box, Card, Grid, makeStyles, Typography } from "@material-ui/core";
import { Listing, Page, SearchBar, TabsSection } from "components";
import React, { useEffect, useState } from "react";
import { useFilter } from "utils/filter";
import { buttonConfig, fields } from "./classificationConfig";
import { CategoryItem, CharacterItem, CreateClassification, LinkForm, ProductTypeItem } from "./components";

const tabKeys = ["character", "category", "product_type"];

const useStyles = makeStyles(theme => ({
  mainPaper: {
    marginBottom: theme.spacing(0),
  },
  linkCard: {
    display: "flex",
    marginTop: theme.spacing(6),
    marginLeft: theme.spacing(3),
    minHeight: 200,
    minWidth: 300,
    justifyContent: "center",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(0),
    }
  },
  linkCardTitle: {
    margin: theme.spacing(2),
  },
  linkForm: {
    margin: theme.spacing(2)
  }
}));

let mounted = false;
const Classifications = (props) => {
  const classes = useStyles();
  const [openCreate, setOpenCreate] = useState(false);
  const [activeTab, setActiveTab] = useState("character");
  const [filter, updateFilter] = useFilter("classifications");

  buttonConfig[activeTab].create.onClick = () => setOpenCreate(true);

  useEffect(() => {
    mounted = true;
    updateFilter({ ...filter, type: activeTab });
    return () => mounted = false;
  }, []); // eslint-disable-line

  const onCreate = () => {
    setOpenCreate(false);
  }

  const handleChange = (event, newValue) => {
    updateFilter({ ...filter, type: tabKeys[newValue], offset: 0 });
    mounted && setActiveTab(tabKeys[newValue]);
  };

  return (
    <Page title="Classifications" dashboard={true}>
      <Grid container>
        <Grid item xs={12} sm={12} md={activeTab === "product_type" ? 8 : 12} >
          <TabsSection
            onChange={handleChange}
            labels={
              ["Character", "Category", "Product Type"]
            }
            panels={
              [
                <Listing
                  name="classificationCharacter"
                  path="classification/list"
                  fields={fields[activeTab]}
                  dense
                  pageRow
                  topElement={
                    <SearchBar name="classificationCharacter" placeholder="Search Character" buttons={buttonConfig[activeTab]} />
                  }
                  itemComponent={CharacterItem}
                  errorMsg="Sorry, we cannot find any Characters. Please add Characters or try searching again."
                />,
                <Listing
                  name="classificationCategory"
                  path="classification/list"
                  fields={fields[activeTab]}
                  dense
                  pageRow
                  topElement={
                    <SearchBar name="classificationCategory" placeholder="Search Category" buttons={buttonConfig[activeTab]} />
                  }
                  itemComponent={CategoryItem}
                  errorMsg="Sorry, we cannot find any Category. Please add Category or try searching again."
                />,
                <Listing
                  name="classificationProductType"
                  path="classification/list"
                  fields={fields[activeTab]}
                  dense
                  pageRow
                  topElement={
                    <SearchBar name="classificationProductType" placeholder="Search Product Type" buttons={buttonConfig[activeTab]} />
                  }
                  itemComponent={ProductTypeItem}
                  errorMsg="Sorry, we cannot find any Product Type. Please add Product Type or try searching again."
                />
              ]
            }
            panelPaper={false}
            className={classes.mainPaper}
          />
        </Grid>
        {activeTab === "product_type" && (
          <Grid item xs={12} sm={12} md={4}>
            <Card className={classes.linkCard}>
              <Box className={classes.linkCardTitle}>
                <Typography variant="h5">Properties Quick Editor (Link)</Typography>
              </Box>
              <LinkForm className={classes.linkForm} />
            </Card>
          </Grid>
        )}
      </Grid>
      <CreateClassification
        type={activeTab}
        value={activeTab}
        open={openCreate}
        handleClose={onCreate}
      />
    </Page>
  );
}

export default Classifications;