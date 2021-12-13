import { Button, makeStyles, TableCell, TableRow } from "@material-ui/core";
import { ReactComponent as DeleteIcon } from "assets/images/icons/list-delete.svg";
import { ReactComponent as EditIcon } from "assets/images/icons/list-edit.svg";
import { ReactComponent as LinkIcon } from "assets/images/icons/list-link.svg";
import { DeleteDialog } from "components";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "store";
import useApi from "utils/api/useApi";
import { useRouter } from "utils/tools";
import { EditClassification } from "../../components";

const useStyles = makeStyles(theme => ({
  img: {
    width: 100,
    height: 100,
    objectFit: "cover",
    margin: "4px auto 4px 0px",
  },
  imgPlaceholder: {
    width: 70,
    height: 90,
    margin: "10px auto 6px 20px",
    opacity: 0.40,
  },
  imgCell: {
    padding: "0px 10px",
  },
  nameCell: {
    minWidth: 300,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
}));

const CategoryItem = (props) => {
  const { model, ...rest } = props;
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const classes = useStyles();
  const api = useApi();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const router = useRouter();

  const onEdit = () => {
    setOpenEdit(false);
  }

  const del = () => {
    return api.path("classification/delete", { category_id: model.id }).del();
  }

  const handleDelete = () => {
    enqueueSnackbar("Category Successfully Deleted!", { variant: "success" });
    dispatch(Actions.Filter.reload({ key: "classificationCategory" }));
    setOpenDelete(false);
  }

  const onLink = () => {
    router.history.push(`/frontend/classifications/${model.id}/detail`)
  }

  return (
    <TableRow
      {...rest}
    >
      <TableCell className={classes.nameCell}>{model.name}</TableCell>

      <TableCell>
        <div className={classes.buttons}>
          <Button onClick={() => setOpenEdit(true)}>
            <EditIcon />
          </Button>
          <Button onClick={() => setOpenDelete(true)}>
            <DeleteIcon />
          </Button>
          <Button onClick={onLink}>
            <LinkIcon />
          </Button>
        </div>
      </TableCell>
      <DeleteDialog
        name="category"
        del={del}
        open={openDelete}
        handleDelete={handleDelete}
        handleClose={() => setOpenDelete(false)}
      />
      <EditClassification
        model={model}
        value="category"
        valueId={model.id}
        open={openEdit}
        handleClose={() => onEdit()}
      />
    </TableRow>
  )
}

export default CategoryItem;