import { Button, Chip, makeStyles, TableCell, TableRow } from "@material-ui/core";
import { ReactComponent as DeleteIcon } from "assets/images/icons/list-delete.svg";
import { ReactComponent as LinkIcon } from "assets/images/icons/list-link.svg";
import { DeleteDialog } from "components";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "store";
import useApi from "utils/api/useApi";
import Placeholder from "assets/images/placeholder/placeholder.svg";
import { useRouter } from "utils/tools";

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
  chip: {
    margin: theme.spacing(1, 2)
  },
}));

const ClassificationProduct = (props) => {
  const { model, reloadItem, ...rest } = props;
  const classes = useStyles();
  const [openDelete, setOpenDelete] = useState(false);
  const api = useApi();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const router = useRouter();
  const id = router?.match?.params.classification_id;

  useEffect(() => {
  }, [model]);


  const del = () => {
    if (typeof parseInt(id) !== "number") return;
    let categories = [...model.categories ? model.categories.map(c => c.id) : []];
    const index = categories.findIndex(cat => cat === parseInt(id));
    if (index >= 0) {
      categories.splice(index, 1);
    }
    const body = { categories };
    return api.path("product/category", { product_id: model.id }).post({ body });
  }

  const handleDelete = () => {
    enqueueSnackbar("Product successfully removed from classification!", { variant: "success" });
    dispatch(Actions.Filter.reload({ key: "classificationProduct" }));
  }

  const onLink = () => {
    router.history.push(`/products/${model.id}/detail`);
  }

  return (
    <TableRow
      {...rest}
    >
      <TableCell className={classes.imgCell}>
        <img
          className={model?.preview ? classes.img : classes.imgPlaceholder}
          src={model?.preview?.uri || Placeholder}
          alt={model?.name || ""}
        />
      </TableCell>
      <TableCell className={classes.nameCell}>{model.name}</TableCell>
      <TableCell>{model?.sku}</TableCell>
      <TableCell>{model?.upc}</TableCell>
      <TableCell>
        {model?.categories?.map((category, index) => (
          <Chip
            key={index}
            label={category.name}
            color="primary"
            className={classes.chip}
          />
        ))}
      </TableCell>
      <TableCell>
        <div className={classes.buttons}>
          <Button onClick={onLink}>
            <LinkIcon />
          </Button>
          <Button onClick={() => setOpenDelete(true)}>
            <DeleteIcon />
          </Button>
        </div>
      </TableCell>

      <DeleteDialog
        name="product from classification"
        overwriteTitle="Remove Product"
        overwriteMessage="Are you sure you want to remove this product from the classification?"
        overwriteButton="Remove Product from Classification"
        del={del}
        open={openDelete}
        handleDelete={handleDelete}
        handleClose={() => setOpenDelete(false)}
      />
    </TableRow>
  )
}

export default ClassificationProduct;