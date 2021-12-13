import React from "react";
import {
  TableRow,
  TableCell,
  Box,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { cashFormat, quantityFormat } from "utils/formatting";
import { RenderGuard } from "components";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#FFFFFF",
    padding: theme.spacing(2, 0),
  },
  textInfo: {
    fontSize: 14,
    marginTop: 8,
  },
  mrTop16: {
    marginTop: 16,
  },
  boxContent: {
    display: "flex",
    justifyContent: "flex-end",
  },
  title: {
    display: "flex",
    flexDirection: "column",
    alignItems: " flex-end",
  },
  price: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  mrRight40: {
    marginRight: theme.spacing(5),
  },
  orderTotal: {
    color: "red",
  },
  marginTopBottom: {
    margin: theme.spacing(1, 0),
  },
  button: {
    backgroundColor: "rgb(255 235 59 / 37%)",
    color: "black",
    boxShadow:
      "0 1px 1px 0 rgb(0 0 0 / 14%), 0 2px 1px -1px rgb(0 0 0 / 12%), 0 1px 3px 0 rgb(0 0 0 / 20%)",
    padding: "10px 16px",
    marginLeft: theme.spacing(1),
    textTransform: "none",
    border: "none",
    "&:hover": {
      backgroundColor: "rgb(255 235 59 / 37%)",
      color: "black",
      boxShadow:
        "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
    },
  },
}));
const OrderSubtotal = (props) => {
  const { items } = props;
  const classes = useStyles();

  const calcQuantity = (items) => {
    let quantity = 0;
    items.forEach((each) => {
      quantity += each.quantity;
    });
    return quantityFormat(quantity);
  };

  const calcSubtotal = (items) => {
    let subtotal = 0.0;
    items.forEach((each) => {
      subtotal += each.subtotal;
    });
    return cashFormat(subtotal);
  };

  return (
    <RenderGuard renderIf={items.length > 0}>
      <TableRow>
        <TableCell colSpan={4}>&nbsp;</TableCell>
        <TableCell colSpan={5}>
          <Box className={classes.root}>
            <Box className={classes.boxContent}>
              <Box className={classes.title}>
                <Typography className={classes.mrRight40}>
                  Merchandise Subtotal :
                </Typography>
                <Typography className={classes.mrRight40}>
                  Refunded Total :
                </Typography>
              </Box>
              <Box className={classes.price}>
                <Typography variant="h5">$99.90</Typography>
                <Typography variant="h5">$2.00</Typography>
              </Box>
            </Box>
          </Box>
        </TableCell>
      </TableRow>
    </RenderGuard>
  );
};

export default OrderSubtotal;
