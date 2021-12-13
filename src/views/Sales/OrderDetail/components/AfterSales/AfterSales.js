import React from "react";
import {
  makeStyles,
  Typography,
  Box,
  Grid,
  Button,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#FFFFFF",
    boxShadow: " 0 0 0 1px rgb(63 63 68 / 5%), 0 1px 3px 0 rgb(63 63 68 / 15%)",
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(2),
  },
  textInfo: {
    fontSize: 14,
    marginTop: 8,
  },
  mrTop16: {
    marginTop: 16,
  },
  mrLeft8: {
    marginLeft: 8,
  },
  input: {
    width: "100%",
    marginLeft: theme.spacing(2),
  },
  img: {
    height: 80,
    width: 80,
  },
  button: {
    backgroundColor: "#ff0000ab",
    color: "white",
    boxShadow:
      "0 1px 1px 0 rgb(0 0 0 / 14%), 0 2px 1px -1px rgb(0 0 0 / 12%), 0 1px 3px 0 rgb(0 0 0 / 20%)",
    padding: "10px 16px",
    margin: theme.spacing(2),
    textTransform: "none",
    border: "none",
    "&:hover": {
      backgroundColor: "#ff0000ab",
      color: "white",
      boxShadow:
        "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
    },
  },
  box: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const AfterSales = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Box className={classes.root}>
        <Typography variant="h4">Returns requested</Typography>
        <Typography className={classes.mrTop16} variant="h6">
          Request ID
        </Typography>
        <Typography className={classes.textInfo}>#20020265155</Typography>
        <Typography className={classes.mrTop16} variant="h6">
          Requested Product
        </Typography>
        <Box className={classes.boxShippingAddress}>
          <Typography className={classes.textInfo}>#AB-ABABAB</Typography>
          <Typography className={classes.textInfo}>#AB-ABABAB</Typography>
        </Box>
        <Grid className={classes.mrTop16} container>
          <Grid xs={1}>
            <img className={classes.img} alt=""/>
          </Grid>
          <Grid xs={11}>
            <Typography className={classes.mrLeft8}>
              Note from customer , Wrong item sent etc
            </Typography>
          </Grid>
        </Grid>
        <Box className={classes.box}>
          <Button className={classes.button}>Request Status</Button>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default AfterSales;
