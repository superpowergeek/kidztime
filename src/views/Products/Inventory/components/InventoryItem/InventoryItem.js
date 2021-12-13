import { Chip, CircularProgress, makeStyles, TableCell, TableRow, TextField } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import Placeholder from "assets/images/placeholder/placeholder.svg";
import ListingCheckbox from "components/Listing/components/ListingBody/ListingCheckbox";
import { useSnackbar } from "notistack";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "store";
import useApi from "utils/api/useApi";
import { quantityFormat } from "utils/formatting";
import { useAsyncTask } from "utils/tools";

const useStyles = makeStyles(theme => ({
  img: {
    maxWidth: 50,
    height: 50,
    objectFit: "cover",
    margin: theme.spacing(1.5, 0, 1, 1.5),
  },
  imgPlaceholder: {
    width: 35,
    height: 45,
    margin: "10px auto 6px 20px",
    opacity: 0.40,
  },
  imgCell: {
    padding: "0px 10px",
  },
  chipSuccess: {
    backgroundColor: "#3BC129",
    color: "white",
    fontWeight: "bold",
    minWidth: 80
  },
  chipWarning: {
    backgroundColor: "#FEDB02",
    color: "white",
    fontWeight: "bold",
    minWidth: 80
  },
  chipDanger: {
    backgroundColor: "#FD7271",
    color: "white",
    fontWeight: "bold",
    minWidth: 80
  },
  itemCodeCell: {
    fontWeight: "bold",
    color: "#0D5AE5"
  },
  loader: {
    marginLeft: 4
  },
  editIcon: {
    fontSize: 14,
    marginLeft: 4,
    cursor: "pointer",
  }
}));

const InventoryItem = (props) => {
  const { model, reloadItem, ...rest } = props;
  const checkedList = useSelector(state => state.Models.products.checkedList)
  const checked = checkedList.includes(model.id);
  const classes = useStyles();
  const [count, setCount] = useState(model?.inventory_items[0]?.count || 0);
  const [editCount, setEditCount] = useState(false);
  const [runUpdate, load] = useAsyncTask(`update-inventory-item-${model.id}`);
  const { enqueueSnackbar } = useSnackbar();
  const api = useApi();

  const dispatch = useDispatch();

  const getStatusChip = (stock) => {
    if (stock >= 10)
      return <Chip className={classes.chipSuccess} label="In Stock" />;
    else if (stock > 0)
      return <Chip className={classes.chipWarning} label="Low Stock" />;
    else
      return <Chip className={classes.chipDanger} label="No Stock" />;
  }

  const handleClick = () => {
    let list = [...checkedList];
    if (checked) {
      list = list.filter((value) => value !== model.id);
    } else {
      list.push(model.id);
    }
    dispatch(Actions.Models.update({ key: "products", value: { checkedList: list } }))
  }

  const handleBlur = () => {
    setEditCount(false);
    if (model.count === count) return;
    handleUpdate();
  }

  const handleUpdate = () => {
    runUpdate(async () => {
      const data = { count };
      const { data: { result: { model: item } } } = await api.path("inventory/product/update", { inventory_id: model?.inventory_items[0]?.inventory_id, product_id: model?.inventory_items[0]?.product_id }).post({ body: data });
      reloadItem({ ...model, inventory_items: [item] });
      enqueueSnackbar("Inventory Updated!", { variant: "success" });
    })
  }

  return (
    <TableRow {...rest}>
      <ListingCheckbox checked={checked} onClick={handleClick} />
      <TableCell className={classes.imgCell}>
        <img
          className={model?.preview ? classes.img : classes.imgPlaceholder}
          src={model?.preview?.uri || Placeholder}
          alt={model?.name || ""}
        />
      </TableCell>
      <TableCell className={classes.itemCodeCell}>{model?.reference}</TableCell>
      <TableCell>{model?.name}</TableCell>
      <TableCell>{"-"}</TableCell>
      <TableCell>
        {!editCount && (
          <Fragment>
            {quantityFormat(model?.inventory_items[0]?.count || 0)}
            {!load && !editCount && <EditIcon onClick={() => setEditCount(true)} className={classes.editIcon} />}
            {load && <CircularProgress className={classes.loader} size={12} thickness={4} />}
          </Fragment>
        )}
        {editCount && (
          <TextField
            onKeyPress={(ev) => {
              if (ev.key === "Enter") {
                handleBlur();
                ev.preventDefault();
              }
            }}
            type="number"
            autoFocus
            value={count}
            onBlur={handleBlur}
            onChange={(e) => setCount(e.target.value)}
          />
        )}
      </TableCell>
      <TableCell>{getStatusChip(model?.inventory_items[0]?.count || 0)}</TableCell>
    </TableRow>
  )
}

export default InventoryItem;