import { Chip, makeStyles, TableCell, TableRow } from "@material-ui/core";
import ListingCheckbox from "components/Listing/components/ListingBody/ListingCheckbox";
import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "store";
import { DateFormat, RolesDisplay } from "utils/constants";
import { useRouter } from "utils/tools";

const useStyles = makeStyles(theme => ({
  chipPad: {
    marginRight: 4,
    marginTop: 2,
    marginBottom: 2,
  },
  name: {
    minWidth: 180,
  },
  email: {
    minWidth: 240,
  },
  selectable: {
    cursor: "pointer",
  },
}));

const nameFormat = (model) => {
  const name = `${model.firstname && `${model.firstname} `}${model.lastname || ""}`
  return name || "-";
}

const CustomerItem = (props) => {
  const { model, reloadItem, ...rest } = props;
  const checkedList = useSelector(state => state.Models.customers.checkedList)
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
    dispatch(Actions.Models.update({ key: "customers", value: { checkedList: list } }))
  }

  return (
    <TableRow
      {...rest}
      hover
      className={classes.selectable}
      onClick={() => router.history.push(`/customers/${model.id}/detail`)}
    >
      <ListingCheckbox checked={checked} onClick={handleClick} />
      <TableCell className={classes.name}>{nameFormat(model)}</TableCell>
      <TableCell className={classes.email}>{model.email_address}</TableCell>
      <TableCell>{model.last_seen_at ? moment(model.last_seen_at).format(DateFormat.MAIN) : "-"}</TableCell>
      <TableCell>
        {
          model?.privileges?.map((each, index) => {
            return (
              <Chip className={classes.chipPad} label={RolesDisplay[each.name]} key={index} />
            )
          })
        }
      </TableCell>
    </TableRow>
  )
}

export default CustomerItem;