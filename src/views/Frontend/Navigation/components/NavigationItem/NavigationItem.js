import { makeStyles, TableCell, TableRow } from "@material-ui/core";
import ListingCheckbox from "components/Listing/components/ListingBody/ListingCheckbox";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "store";
import { EditNavigationItem } from "./components";

const useStyles = makeStyles(theme => ({
  selectable: {
    cursor: "pointer",
  },
}));

const NavigationItem = (props) => {
  const { model, reloadItem, ...rest } = props;
  const checkedList = useSelector(state => state.Models.pages.checkedList)
  const checked = checkedList.includes(model.id);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);

  const handleClick = () => {
    let list = [...checkedList];
    if (checked) {
      list = list.filter((value) => value !== model.id);
    } else {
      list.push(model.id);
    }
    dispatch(Actions.Models.update({ key: "pages", value: { checkedList: list } }))
  }

  const handleClose = () => {
    setEdit(false);
    dispatch(Actions.Filter.reload({ key: "navigation" }));
  }

  return (
    <TableRow
      hover
      className={classes.selectable}
      onClick={() => setEdit(true)} {...rest}
    >
      <ListingCheckbox checked={checked} onClick={handleClick} />
      <TableCell>{model.banner?.extra0}</TableCell>
      <TableCell>{model.banner?.value}</TableCell>
      <TableCell>{model.categories?.map((cat, index) => `${cat.name}${index === model?.categories.length - 1 ? "" : ", "}`)}</TableCell>
      {edit && <EditNavigationItem
        open={edit}
        handleClose={handleClose}
        model={model}
      />}
    </TableRow>
  )
}

export default NavigationItem;