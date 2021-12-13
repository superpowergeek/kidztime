import React, { useState, useEffect, Fragment } from "react";
import { useDispatch } from "react-redux";
import { makeStyles, TableCell, TableRow, Button, Switch } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { ReactComponent as DeleteIcon } from "assets/images/icons/list-delete.svg";
import useApi from "utils/api/useApi";
import { DeleteDialog } from "components";
import { Actions } from "store";
import { useRouter } from "utils/tools";
import dateFormat from "utils/formatting/dateFormat";

const useStyles = makeStyles(theme => ({
  selectable: {
    cursor: "pointer",
  },
}));
let mounted = false;

const PromotionListItem = (props) => {
  const { model, reloadItem, onChangeStatus, ...rest } = props;
  const [openDelete, setOpenDelete] = useState(false);

  const classes = useStyles();
  const router = useRouter();
  const api = useApi();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const del = () => {
    return api.path("group/promotion_group/delete", { group_id: model.id }).del();
  }

  const handleDelete = () => {
    enqueueSnackbar("Promotion Group Successfully Deleted!", { variant: "success" });
    dispatch(Actions.Filter.reload({ key: "promotionGroups" }));
  }

  useEffect(() => {
    mounted = true;
    return () => mounted = false;
  }, []);

  const handleChangeStauts = () => {
    const updated_model = { ...model, published: !model.published };
    api.path("group/promotion_group/update", {group_id: model.id}).put({ body: updated_model });
    dispatch(Actions.Filter.reload({ key: "promotionGroups" }));
  }

  return (
    <Fragment>
      <TableRow
        hover
        className={classes.selectable}
        onClick={() => router.history.push(`/promotion-settings/${model.id}/detail`)}
        {...rest}
      >
        <TableCell>{model.name}</TableCell>
        <TableCell>{model.products.length > 0 ? `${model.products.length} items` : "no item"}</TableCell>
        <TableCell>{dateFormat(model.start_at)}</TableCell>
        <TableCell>{dateFormat(model.end_at)}</TableCell>
        <TableCell onClick={(e) => {e.stopPropagation()}}>
          <Switch 
            checked={model.published}
            onChange={() => {handleChangeStauts()}}
          />
        </TableCell>
        <TableCell>
          <Button onClick={(e) => {e.stopPropagation(); setOpenDelete(true)}}>
            <DeleteIcon />
          </Button>
        </TableCell>

      </TableRow>
      <DeleteDialog
        name="promotionGroups"
        del={del}
        open={openDelete}
        handleDelete={handleDelete}
        handleClose={() => mounted && setOpenDelete(false)}
      />
    </Fragment>
  )
}

export default PromotionListItem;