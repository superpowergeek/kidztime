import { Button, makeStyles, TableCell, TableRow, Tooltip } from "@material-ui/core";
import { ReactComponent as DeleteIcon } from "assets/images/icons/list-delete.svg";
import { ReactComponent as EditIcon } from "assets/images/icons/list-edit.svg";
import { ReactComponent as LinkIcon } from "assets/images/icons/list-link.svg";
import { ReactComponent as TagIcon } from "assets/images/icons/list-tag.svg";
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
    minWidth: 250,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
}));

let mounted;
const ProductTypeItem = (props) => {
  const { model, ...rest } = props;
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
    enqueueSnackbar("Product Type Successfully Deleted!", { variant: "success" });
    dispatch(Actions.Filter.reload({ key: "classificationProductType" }));
  }

  const onLink = () => {
    router.history.push(`/frontend/classifications/${model.id}/detail`);
  }

  const getAgeRange = () => {
    return extras && extras["min_age"] && extras["max_age"] ? `${extras["min_age"]} yrs - ${extras["max_age"]} yrs` : "-";
  }

  const getTagName = () => {
    if (!model.child) return;
    return model.child?.parent?.name;
  }

  return (
    <TableRow {...rest}>
      <TableCell className={classes.nameCell}>{model.name}</TableCell>
      <TableCell>{getAgeRange()}</TableCell>

      <TableCell>
        <div className={classes.buttons}>
          {model.child && (
            <Tooltip title={getTagName()}>
              <Button>
                <TagIcon />
              </Button>
            </Tooltip>
          )}
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
        name="product type"
        del={del}
        open={openDelete}
        handleDelete={handleDelete}
        handleClose={() => setOpenDelete(false)}
      />

      <EditClassification
        model={model}
        value="product_type"
        valueId={model.id}
        open={openEdit}
        handleClose={() => onEdit()}
      />
    </TableRow>
  )
}

export default ProductTypeItem;