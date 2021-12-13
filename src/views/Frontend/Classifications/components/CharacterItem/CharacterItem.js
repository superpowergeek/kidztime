import { Button, makeStyles, TableCell, TableRow } from "@material-ui/core";
import { ReactComponent as DeleteIcon } from "assets/images/icons/list-delete.svg";
import { ReactComponent as EditIcon } from "assets/images/icons/list-edit.svg";
import { ReactComponent as LinkIcon } from "assets/images/icons/list-link.svg";
import Placeholder from "assets/images/placeholder/placeholder.svg";
import { DeleteDialog } from "components";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "store";
import useApi from "utils/api/useApi";
import { useRouter } from "utils/tools";
import { EditClassification } from "../../components";

const useStyles = makeStyles(theme => ({
  img: {
    width: 50,
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
  nameCell: {
    minWidth: 200,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
}));

let mounted = false;
const CharacterItem = (props) => {
  const { model, reloadItem, ...rest } = props;
  const classes = useStyles();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [extras, setExtras] = useState({});
  const api = useApi();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    mounted = true;
    mounted && setExtras(JSON.parse(model.extras));
    return () => mounted = false;
  }, [model]);

  const onEdit = () => {
    setOpenEdit(false);
  }

  const del = () => {
    return api.path("classification/delete", { category_id: model.id }).del();
  }

  const handleDelete = () => {
    enqueueSnackbar("Character Successfully Deleted!", { variant: "success" });
    dispatch(Actions.Filter.reload({ key: "classificationCharacter" }));
  }

  const onLink = () => {
    router.history.push(`/frontend/classifications/${model.id}/detail`)
  }

  return (
    <TableRow
      {...rest}>
      <TableCell className={classes.imgCell}>
        <img
          className={model?.asset ? classes.img : classes.imgPlaceholder}
          src={model?.asset?.uri || Placeholder}
          alt={model?.name || ""}
        />
      </TableCell>
      <TableCell className={classes.nameCell}>{model.name}</TableCell>
      <TableCell>{extras && extras["gender"]}</TableCell>

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
        name="character"
        del={del}
        open={openDelete}
        handleDelete={handleDelete}
        handleClose={() => mounted && setOpenDelete(false)}
      />
      <EditClassification
        model={model}
        value="character"
        valueId={model.id}
        open={openEdit}
        handleClose={() => onEdit()}
      />
    </TableRow>
  )
}

export default CharacterItem;