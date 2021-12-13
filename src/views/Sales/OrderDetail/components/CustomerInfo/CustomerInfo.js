import React, { useCallback } from "react";
import { makeStyles, Typography, Box } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";

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
}));

const CustomerInfo = (props) => {
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
        <Typography variant="h5">Customer ID</Typography>
        <Typography className={classes.textInfo}>
          {model?.account_id ? model?.account_id : "-"}
        </Typography>
        <Typography className={classes.mrTop16} variant="h5">
          Customer Information
        </Typography>
        <Box className={classes.boxShippingAddress}>
          <Typography className={classes.textInfo}>
            <PersonIcon className={classes.mrRight8} />
            {setNameCustomer()}
          </Typography>
          <Typography className={classes.textInfo}>
            <EmailIcon className={classes.mrRight8} />
            {model?.account?.email_address
              ? model?.account?.email_address
              : "-"}
          </Typography>
          <Typography className={classes.textInfo}>
            <ContactPhoneIcon className={classes.mrRight8} />
            {model?.account?.phone_number
              ? model?.account?.phone_number
              : "-"}
          </Typography>
        </Box>
        <Typography className={classes.mrTop16} variant="h5">
          Order Notes
        </Typography>
        <Typography className={classes.textInfo}>Great!</Typography>
      </Box>
    </React.Fragment>
  );
};

export default CustomerInfo;
