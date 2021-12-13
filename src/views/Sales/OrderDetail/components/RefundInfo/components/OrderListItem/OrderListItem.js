import React, { useCallback } from "react";
import {
  makeStyles,
  TableRow,
  TableCell,
  Box,
  Typography,
} from "@material-ui/core";
import Placeholder from "assets/images/not-found/no-images.png";

const useStyles = makeStyles((theme) => ({
  img: {
    width: 100,
    height: 100,
    objectFit: "cover",
    margin: "4px 8px 4px 0px",
  },
  imgPlaceholder: {
    width: 80,
    height: 80,
    margin: "10px 8px 6px 0px",
    opacity: 0.4,
  },
  unitPrice: {},
  productCode: {
    color: "blue",
    fontWeight: "bold",
  },
  productCell: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "rgb(244 67 54 / 74%)",
    color: "white",
    boxShadow:
      "0 1px 1px 0 rgb(0 0 0 / 14%), 0 2px 1px -1px rgb(0 0 0 / 12%), 0 1px 3px 0 rgb(0 0 0 / 20%)",
    padding: "10px 16px",
    marginLeft: theme.spacing(1),
    textTransform: "none",
    border: "none",
    "&:hover": {
      backgroundColor: "rgb(244 67 54 / 74%)",
      color: "white",
      boxShadow:
        "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
    },
  },
}));

const OrderListItem = (props) => {
  const { model, reloadItem, ...rest } = props;
  const classes = useStyles();

  return (
    <TableRow {...rest}>
      <TableCell>
        <Box className={classes.productCell}>
          <img
            className={
              model?.product?.preview ? classes.img : classes.imgPlaceholder
            }
            src={
              model?.product?.preview
                ? model?.product?.preview?.uri
                : Placeholder
            }
            alt={model?.name ? model?.name : ""}
          />
          <Typography className={classes.productCode}>TC-TB123456C</Typography>
        </Box>
      </TableCell>
      <TableCell>8888943123456</TableCell>
      <TableCell>$19.90</TableCell>
      <TableCell>Nil</TableCell>
      <TableCell>$12.90</TableCell>
      <TableCell className={classes.unitPrice}>1pc</TableCell>
      <TableCell className={classes.unitPrice}>$12.9</TableCell>
    </TableRow>
  );
};

export default OrderListItem;
