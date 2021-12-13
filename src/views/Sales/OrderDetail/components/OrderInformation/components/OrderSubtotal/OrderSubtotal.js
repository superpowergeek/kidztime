import React, { useMemo } from "react";
import {
  TableRow,
  TableCell,
  Box,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import { cashFormat, quantityFormat } from "utils/formatting";
import clsx from "clsx";
import { RenderGuard } from "components";
import { useCallback } from "react";
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
  mrtop8: {
    marginTop: 8,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
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
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    textTransform: "none",
    border: "none",
    "&:hover": {
      backgroundColor: "rgb(255 235 59 / 37%)",
      color: "black",
      boxShadow:
        "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
    },
  },
  price: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  red: {
    color: "red",
  },
}));
const OrderSubtotal = (props) => {
  const { model } = props;
  const classes = useStyles();
  const promotion = 3.0;
  const calcSubtotal = useCallback(
    (model) => {
      let subtotal = 0.0;
      model.order_items.forEach((each) => {
        subtotal += each.subtotal;
      });
      return cashFormat(subtotal);
    },
    [model]
  );
  const orderTotal = useMemo(() => {
    return cashFormat(
      parseFloat(calcSubtotal(model).slice(1)) + model?.shipping - promotion
    );
  }, [calcSubtotal]);

  const showBtnReceipt = useCallback(() => {
    return (
      <Box className={classes.boxContent}>
        <Button className={clsx(classes.button, classes.mrtop8)}>
          Waive Excess
        </Button>
        <Button className={clsx(classes.button, classes.mrtop8)}>
          Send E-Invoice
        </Button>
      </Box>
    );
  }, []);
  return (
    <RenderGuard renderIf={model.order_items.length > 0}>
      <TableRow>
        <TableCell colSpan={4}>&nbsp;</TableCell>
        <TableCell colSpan={5}>
          <Box className={classes.root}>
            <Box className={classes.content}>
              <Box className={classes.boxContent}>
                <Box className={classes.title}>
                  <Typography className={classes.mrRight40}>
                    Merchandise Subtotal :
                  </Typography>
                  {false && (
                    <Typography className={classes.mrRight40}>
                      Receipt difference from exchange :
                    </Typography>
                  )}
                </Box>
                <Box className={classes.price}>
                  <Typography variant="h5">{calcSubtotal(model)}</Typography>
                  <Typography variant="h5"> {false && " $2.00"}</Typography>
                </Box>
              </Box>
              {false && showBtnReceipt()}
              <Box className={classes.boxContent}>
                <Box className={classes.title}>
                  <Typography className={classes.mrRight40}>
                    Shipping Sub-total :
                  </Typography>
                  <Typography className={classes.mrRight40}>
                    Promotion & Rebate :
                  </Typography>
                  <Typography
                    className={clsx(classes.mrRight40, classes.mrTop16)}
                  >
                    Order Total :
                  </Typography>
                </Box>
                <Box className={classes.price}>
                  <Typography variant="h5">
                    {cashFormat(model?.shipping)}
                  </Typography>
                  <Typography variant="h5">
                    {cashFormat(promotion) === "-"
                      ? cashFormat(promotion)
                      : `-${cashFormat(promotion)}`}
                  </Typography>
                  <Typography
                    className={clsx(classes.mrTop16, classes.red)}
                    variant="h5"
                  >
                    {orderTotal}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </TableCell>
      </TableRow>
    </RenderGuard>
  );
};

export default OrderSubtotal;
