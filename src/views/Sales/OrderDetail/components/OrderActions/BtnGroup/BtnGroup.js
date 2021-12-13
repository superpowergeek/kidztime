import React from "react";
import clsx from "clsx";
import { Box, Button, makeStyles } from "@material-ui/core";
import StatusList from "../StatusList";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  marginTop20: {
    marginTop: 20,
  },

  btnYellow: {
    backgroundColor: "#ffe500",
    "&:hover": {
      backgroundColor: "#ffe500",
    },
  },
  btnGrey: {
    backgroundColor: "#808080b3",
    "&:hover": {
      backgroundColor: "#808080b3",
    },
  },
  btnRed: {
    backgroundColor: "#ff000099",
    "&:hover": {
      backgroundColor: "#ff000099",
    },
  },
  btnBlue: {
    backgroundColor: "rgb(150,187,255)",
    "&:hover": {
      backgroundColor: "rgb(150,187,255)",
    },
  },
  btnGreen: {
    backgroundColor: "#00800094",
    "&:hover": {
      backgroundColor: "#00800094",
    },
  },
  button: {
    color: "white",
    boxShadow:
      "0 1px 1px 0 rgb(0 0 0 / 14%), 0 2px 1px -1px rgb(0 0 0 / 12%), 0 1px 3px 0 rgb(0 0 0 / 20%)",
    padding: "10px 16px",
    marginLeft: theme.spacing(1),
    textTransform: "none",
    border: "none",
    "&:hover": {
      color: "white",
      boxShadow:
        "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
    },
  },
  orderStatusBox: {
    marginLeft: 8,
  },
  mrleft8: {
    marginLeft: 8,
  },
}));
const BtnGroup = (props) => {
  const {model, reload} = props;
  const classes = useStyles();
  return (
    <Box className={clsx(classes.marginTop20, classes.root)}>
      <Button className={clsx(classes.button, classes.btnYellow)}>
        Modify Order
      </Button>
      <Button className={clsx(classes.button, classes.btnGrey)}>
        Refund Selected
      </Button>
      <Button className={clsx(classes.button, classes.btnRed)}>
        Cancel Order
      </Button>
      <Button className={clsx(classes.button, classes.btnBlue)}>
        Picking list
      </Button>
      <Box className={classes.orderStatusBox}>
        <StatusList model={model} reload={reload} />
      </Box>
    </Box>
  );
};

export default BtnGroup;
