import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { tabstitle } from "../../orderOvConfig";
import TabHeaderItem from "../TabHeaderItem";
import { useFilter } from "utils/filter";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "white",
    boxShadow: " 0 0 0 1px rgb(63 63 68 / 5%), 0 1px 3px 0 rgb(63 63 68 / 15%)",
    borderRadius: "4px",
  },
}));

const TabHeader = () => {
  const classes = useStyles();
  const [nameTabActive, setNameTabActive] = useState("All");
  const click = (nameTabActive) => {
    setNameTabActive(nameTabActive);
  };
  const [filter, updateFilter] = useFilter("orders");
  useEffect(() => {
    updateFilter({
      ...filter,
      status: nameTabActive == "All" ? "" : nameTabActive,
    });
  }, [nameTabActive]);
  const showContent = (tabstitle) => {
    if (tabstitle) {
      const tabtitle = tabstitle.map((tab, index) => {
        let isActived = false;
        if (nameTabActive === tab.title) {
          isActived = true;
        } else {
          isActived = false;
        }
        return (
          <TabHeaderItem
            key={index}
            tab={tab}
            click={click}
            isActived={isActived}
          />
        );
      });
      return tabtitle;
    } else return;
  };
  return (
    <Box className={classes.root}>
      <Grid container spacing={0}>
        {showContent(tabstitle)}
      </Grid>
    </Box>
  );
};
export default TabHeader;
