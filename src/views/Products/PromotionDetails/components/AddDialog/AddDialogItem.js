import { makeStyles, TableCell, TableRow } from "@material-ui/core";
import Placeholder from "assets/images/placeholder/placeholder.svg";
import ListingCheckbox from "components/Listing/components/ListingBody/ListingCheckbox";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "store";
import { ImgCellStyles } from "utils/constants";
import { cashFormat, quantityFormat } from "utils/formatting";
import { useRouter } from "utils/tools";

const useStyles = makeStyles(theme => ({
  ...ImgCellStyles,
  nameCell: {
    minWidth: 300,
  },
  selectable: {
    cursor: "pointer",
  },
}));

const AddDialogItem = (props) => {
  const { model, reloadItem, ...rest } = props;
  const checkedList = useSelector(state => state.Models.addPromotionProducts.checkedList)
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
    dispatch(Actions.Models.update({ key: "addPromotionProducts", value: { checkedList: list } }))
  }

  return (
    <TableRow
      hover
      className={classes.selectable}
      onClick={() => router.history.push(`/products/${model.id}/detail`)} {...rest}
    >
      <ListingCheckbox checked={checked} onClick={handleClick} />
      <TableCell className={classes.imgCell}>
        <img
          className={model?.preview ? classes.img : classes.imgPlaceholder}
          src={model?.preview?.uri || Placeholder}
          alt={model?.name || ""}
        />
      </TableCell>
      <TableCell className={classes.nameCell}>{model.name}</TableCell>
      <TableCell>{cashFormat(model?.price)}</TableCell>
      <TableCell>{model?.sku}</TableCell>
      <TableCell>{model?.upc}</TableCell>
      <TableCell>{quantityFormat(model?.stock)}</TableCell>
    </TableRow>
  )
}

export default AddDialogItem;