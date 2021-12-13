import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import classnames from "classnames";

const useStyles = makeStyles((theme) => ({
  paper: {
    boxShadow: "none",
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  button: {
    textTransform: "none",
    padding: "8px 20px",
    "&:hover": {
      borderRadius: 30,
      backgroundColor: "#987cb19e;",
    },
    "&.MuiButton-root": {
      borderRadius: 30,
    },
  },
  actived: {
    color: "#ffffff",
    borderRadius: 30,
    backgroundColor: "rgb(45,40,102)",
  },
}));

const TabHeaderItem = (props) => {
  const classes = useStyles();
  const click = () => {
    props.click(props.tab.title);
  };
  const className = props.isActived ? classes.actived : "";
  return (
    <Box>
      <Box className={classes.paper}>
        <Button
          className={classnames(classes.button, className)}
          onClick={click}
        >
          {props.tab.title}
        </Button>
      </Box>
    </Box>
  );
};

export default TabHeaderItem;
