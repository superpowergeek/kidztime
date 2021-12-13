import React, { useCallback } from "react";
import palette from "theme/palette";
import {
  makeStyles,
  Typography,
  Box,
  TextField,
  Button,
} from "@material-ui/core";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

import clsx from "clsx";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#FFFFFF",
    boxShadow: " 0 0 0 1px rgb(63 63 68 / 5%), 0 1px 3px 0 rgb(63 63 68 / 15%)",
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(2),
  },
  textInfo: {
    display: "flex",
    alignItems: "flex-end",
    fontSize: 14,
    marginTop: 8,
  },
  mrTop16: {
    marginTop: 16,
  },
  mrRight8: {
    marginRight: 8,
    color: "rgb(150,187,255)",
  },
  boxShippingAddress: {
    display: "flex",
    flexDirection: "column",
  },
  boxTrackingId: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "rgb(219 222 228 / 49%)",
  },
  button: {
    backgroundColor: palette.warning.main,
    color: "white",
    boxShadow:
      "0 1px 1px 0 rgb(0 0 0 / 14%), 0 2px 1px -1px rgb(0 0 0 / 12%), 0 1px 3px 0 rgb(0 0 0 / 20%)",
    padding: "10px 16px",
    margin: theme.spacing(2),
    textTransform: "none",
    border: "none",
    "&:hover": {
      backgroundColor: palette.warning.main,
      color: "white",
      boxShadow:
        "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
    },
  },
  input: {
    margin: theme.spacing(2),
    padding: "8px 0px",
  },
}));

const OrderAction = (props) => {
  const classes = useStyles();
  const model = props.model;
  const setNameCustomer = useCallback(() => {
    let firstname = model?.account?.firstname ? model?.account?.firstname : "-";
    let lastname = model?.account?.lastname ? model?.account?.lastname : "";
    firstname = firstname.charAt(0).toUpperCase() + firstname.slice(1);
    lastname = lastname.charAt(0).toUpperCase() + lastname.slice(1);
    return firstname + " " + lastname;
  }, [model.account.firstname, model.account.lastname]);
  return (
    <React.Fragment>
      <Box className={classes.root}>
        <Typography variant="h5">Order ID</Typography>
        <Typography className={classes.textInfo}>
          {model?.id ? model?.id : "-"}
        </Typography>
        <Typography className={classes.mrTop16} variant="h5">
          Shipping Address
        </Typography>
        <Box className={classes.boxShippingAddress}>
          <Typography className={classes.textInfo}>
            <PersonIcon className={classes.mrRight8} />
            {setNameCustomer()}
          </Typography>
          <Typography className={classes.textInfo}>
            <CreditCardIcon className={classes.mrRight8} />
            {model?.account?.delivery_address
              ? model?.account?.delivery_address
              : "-"}
          </Typography>
          <Typography className={classes.textInfo}>
            <HomeIcon className={classes.mrRight8} />
            {model?.account?.postal_code ? model?.account?.postal_code : "-"}
          </Typography>
        </Box>
        <Typography className={classes.mrTop16} variant="h5">
          Shipping type
        </Typography>
        <Typography className={classes.textInfo}>
          <LocalShippingIcon className={classes.mrRight8} />
          FreeLocalShipping
        </Typography>
        <Box className={clsx(classes.boxTrackingId, classes.mrTop16)}>
          <TextField className={classes.input} placeholder="Tracking Number" />
          <Button className={classes.button}>Track Package</Button>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default OrderAction;
