import React, { useCallback } from "react";
import {
  makeStyles,
  TableRow,
  TableCell,
  Box,
  Typography,
  Button,
} from "@material-ui/core";
import { cashFormat, quantityFormat } from "utils/formatting";
import Placeholder from "assets/images/not-found/no-images.png";
import ListingCheckbox from "components/Listing/components/ListingBody/ListingCheckbox";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "store";

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
  const checkedList = useSelector((state) => state.Models.orders.checkedList);
  const checked = checkedList.includes(model.id);
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    let list = [...checkedList];
    if (checked) {
      list = list.filter((value) => value !== model.id);
    } else {
      list.push(model.id);
    }
    dispatch(
      Actions.Models.update({ key: "orders", value: { checkedList: list } })
    );
  }, [checkedList, model.id, checked, dispatch]);
  return (
    <TableRow {...rest}>
      <ListingCheckbox onClick={handleClick} />
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
          <Typography className={classes.productCode}>
            {model?.reference ? model?.reference : "-"}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>{model?.product?.upc ? model?.product?.upc : "-"}</TableCell>
      <TableCell>${model?.unit_price ? model?.unit_price : "-"}</TableCell>
      <TableCell>
        {model?.product_type
          ? model?.product_type.charAt(0).toUpperCase() +
            model?.product_type.slice(1)
          : "-"}
      </TableCell>
      <TableCell>
        $
        {model?.unit_price
          ? model?.unit_price -
            (model?.unit_price * model?.discount_value) / 100
          : "-"}
      </TableCell>
      <TableCell className={classes.unitPrice}>
        {model?.quantity ? model?.quantity : "-"} pc
      </TableCell>
      <TableCell className={classes.unitPrice}>
        ${model?.subtotal!==null ? model?.subtotal : "-"}
      </TableCell>
      <TableCell align="right">
        <Button className={classes.button}>Exchange Item</Button>
      </TableCell>
    </TableRow>
  );
};

export default OrderListItem;
