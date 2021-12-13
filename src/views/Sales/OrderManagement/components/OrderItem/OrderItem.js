import React from "react";
import { makeStyles, Chip, TableRow, TableCell } from "@material-ui/core";
import ListingCheckbox from "components/Listing/components/ListingBody/ListingCheckbox";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "store";
import { capitalise, cashFormat, quantityFormat } from "utils/formatting";
import { ChipStyles } from "utils/constants/styles";
import useRouter from "utils/tools/useRouter";
import { OrderStatus } from "utils/constants";
import { findMapKey } from "utils/tools";

const useStyles = makeStyles(theme => ({
  chip: {
    fontWeight: 500,
  },
  name: {
    minWidth: 180,
  },
  address: {
    minWidth: 240,
  },
  selectable: {
    cursor: "pointer",
  },
}));

const OrderItem = (props) => {
  const { model, reloadItem, ...rest } = props;
  const checkedList = useSelector(state => state.Models.orders.checkedList)
  const checked = checkedList.includes(model.id);

  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = () => {
    let list = [...checkedList];
    if (checked) {
      list = list.filter((value) => value !== model.id);
    } else {
      list.push(model.id);
    }
    dispatch(Actions.Models.update({ key: "orders", value: { checkedList: list } }))
  }

  return (
    <TableRow
      {...rest}
      hover
      className={classes.selectable}
      onClick={() => router.history.push(`/orders/${model.id}/detail`)}
    >
      <ListingCheckbox checked={checked} onClick={handleClick} />
      <TableCell>{model.reference || "-"}</TableCell>
      <TableCell className={classes.address}>{model?.account?.delivery_address || "-"}</TableCell>
      <TableCell>{model?.account?.postal_code || "-"}</TableCell>
      <TableCell>{quantityFormat(model?.items)}</TableCell>
      <TableCell>{cashFormat(model?.total)}</TableCell>
      <TableCell className={classes.status}>
        {model.status && <Chip label={capitalise(model.status)} style={ChipStyles[findMapKey(OrderStatus, model.status)]} classes={{ label: classes.chip, }} />}
      </TableCell>
    </TableRow>
  )
};

export default OrderItem;