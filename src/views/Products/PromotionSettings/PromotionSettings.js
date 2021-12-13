import { Grid, makeStyles } from "@material-ui/core";
import { Page, TabsSection } from "components";
import React, { useEffect, useState } from "react";
import { useFilter } from "utils/filter";
import { PromotionSettingsPanel } from "./components";
import { pagesNav } from "./promotionSettingsConfig";

const tabKeys = ["accessory", "gift", "discount"];

const useStyles = makeStyles(theme => ({
  mainPaper: {
    marginBottom: theme.spacing(3)
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
const PromotionSettings = (props) => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState("accessories");
  const [filter, updateFilter] = useFilter("classifications");

  useEffect(() => {
    mounted = true;
    updateFilter({ ...filter, type: activeTab });
    return () => mounted = false;
  }, []); // eslint-disable-line

  const handleChange = (event, newValue) => {
    updateFilter({ ...filter, type: tabKeys[newValue], offset: 0 });
    mounted && setActiveTab(tabKeys[newValue]);
  };

  return (
    <Page title="PromotionSettings" dashboard={true} pagesNav={pagesNav}>
      <Grid>
        <TabsSection
          onChange={handleChange}
          labels={
            ["Accessories", "Gifts", "Discount Group"]
          }
          panels={
              tabKeys.map((tabKey) => {
                return <PromotionSettingsPanel type={tabKey} />
              })
          }
          panelPaper={false}
          className={classes.mainPaper}
        />
      </Grid>
    </Page>
  );
}

export default PromotionSettings;