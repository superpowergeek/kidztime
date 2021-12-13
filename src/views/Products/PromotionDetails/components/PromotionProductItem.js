import { Button, makeStyles, Switch, TableCell, TableRow } from "@material-ui/core";
import { ReactComponent as DeleteIcon } from "assets/images/icons/list-delete.svg";
import Placeholder from "assets/images/placeholder/placeholder.svg";
import { DeleteDialog } from "components";
import ListingCheckbox from "components/Listing/components/ListingBody/ListingCheckbox";
import { useSnackbar } from "notistack";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "store";
import useApi from "utils/api/useApi";
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

const PromotionProductItem = (props) => {
  const { model, reloadItem, parent, ...rest } = props;
  const [openDelete, setOpenDelete] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const del = () => {
    const idList = parent.products.reduce((acc, cur) => {
      if (cur.id !== model.id) {
        acc.push(cur.id);
      }
      return acc;
    }, []);
    let body = { products: idList };
    return api.path("group/promotion_group/product/update", { group_id: parent.id }).post({body});
  }
  const checkedList = useSelector(state => state.Models.promotionProducts.checkedList)
  const checked = checkedList.includes(model.id);

  const classes = useStyles();
  const api = useApi();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = () => {
    let list = [...checkedList];
    if (checked) {
      list = list.filter((value) => value !== model.id);
    } else {
      list.push(model.id);
    }
    dispatch(Actions.Models.update({ key: "promotionProducts", value: { checkedList: list } }))
  }

  const handleChangeStauts = () => {
    const status = model.status === "published" ? "unpublished" : "published";
    const updated_model = { ...model, status: status };
    api.path("product/update", { product_id: model.id }).post({ body: updated_model });
    dispatch(Actions.Filter.reload({ key: "promotionProducts" }));
  }

  const handleDelete = () => {
    enqueueSnackbar("Product Successfully Removed from Promotion Group!", { variant: "success" });
    dispatch(Actions.Filter.reload({ key: "promotionProducts" }));
    reloadItem();
  }

  return (
    <Fragment>
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
        <TableCell>{model.sku}</TableCell>
        <TableCell className={classes.nameCell}>{model.alt_name}</TableCell>
        <TableCell>{quantityFormat(model?.stock)}</TableCell>
        <TableCell>{cashFormat(model?.price)}</TableCell>
        <TableCell>{`% ${parent.discount_value}`}</TableCell>
        <TableCell>{cashFormat(model?.price * parent.discount_value / 100)}</TableCell>
        <TableCell onClick={(e) => { e.stopPropagation() }}>
          <Switch
            checked={model.status === "published"}
            onChange={() => { handleChangeStauts() }}
          />
        </TableCell>
        <TableCell>
          <Button onClick={(e) => { e.stopPropagation(); setOpenDelete(true) }}>
            <DeleteIcon />
          </Button>
        </TableCell>
      </TableRow>
      <DeleteDialog
        name="promotionProduct"
        del={del}
        open={openDelete}
        handleDelete={handleDelete}
        handleClose={() => setOpenDelete(false)}
      />
    </Fragment>
  )
}

export default PromotionProductItem;