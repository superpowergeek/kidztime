import { makeStyles, TableCell, TableRow } from "@material-ui/core";
import ListingCheckbox from "components/Listing/components/ListingBody/ListingCheckbox";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "store";
import { useRouter } from "utils/tools";

const useStyles = makeStyles(theme => ({
  selectable: {
    cursor: "pointer",
  },
}));

const CustomisedPage = (props) => {
  const { model, reloadItem, ...rest } = props;
  const checkedList = useSelector(state => state.Models.pages.checkedList)
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
    dispatch(Actions.Models.update({ key: "pages", value: { checkedList: list } }))
  }

  return (
    <TableRow
      hover
      className={classes.selectable}
      onClick={() => router.history.push(`/frontend/pages/${model.id}/detail`)} {...rest}
    >
      <ListingCheckbox checked={checked} onClick={handleClick} />
      <TableCell>{model.path}</TableCell>
      <TableCell>{model.title}</TableCell>
      <TableCell>{model.description}</TableCell>
    </TableRow>
  )
}

export default CustomisedPage;