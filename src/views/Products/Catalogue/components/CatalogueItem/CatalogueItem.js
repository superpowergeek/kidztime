import { Chip, makeStyles, TableCell, TableRow } from "@material-ui/core";
import ListingCheckbox from "components/Listing/components/ListingBody/ListingCheckbox";
import { ToggleButtons } from "components";
import React, {Fragment, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { Actions } from "store";
import { ImgCellStyles } from "utils/constants";
import { cashFormat, quantityFormat } from "utils/formatting";
import { useAsyncTask, useRouter } from "utils/tools";
import Placeholder from "assets/images/placeholder/placeholder.svg";
import { Platforms, InitialValues, Exports } from "./catalogueItemConfig";
import AddDialog from "../AddDialog";
import useApi from "utils/api/useApi";

const useStyles = makeStyles(theme => ({
  ...ImgCellStyles,
  nameCell: {
    minWidth: 300,
  },
  selectable: {
    cursor: "pointer",
  },
  tagCell: {
    minWidth: 400
  },
  tagContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  }
}));

const CatalogueItem = (props) => {
  const { model, reloadItem, ...rest } = props;
  const [type, setType] = useState("accessory");
  const [openAdd, setOpenAdd] = useState(false);
  const [disableAccessory, setDisableAccessory] = useState(false);
  const [disableGift, setDisableGift] = useState(false);
  const [disableDiscount, setDisableDiscount] = useState(false);
  const checkedList = useSelector(state => state.Models.products.checkedList)
  const checked = checkedList.includes(model.id);
  const [runRemove] = useAsyncTask("product-group-remove");
  const api = useApi();
  const { enqueueSnackbar } = useSnackbar();
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
    dispatch(Actions.Models.update({ key: "products", value: { checkedList: list } }))
  }

  const handleClickTag = (ev, type) => {
    ev.stopPropagation();
    setType(type);
    setOpenAdd(true);
  }

  const handleDeleteTag = (ev, tagId) => {
    ev.stopPropagation();
    runRemove(async () => {
      let { data: { result: { model: productGroups } } } = await api.path("product/group/get", { product_id: model.id }).get();
      let groupIds = productGroups.map((group) => group.id);
      if (tagId) {
        groupIds = groupIds.filter(item => item !== tagId);
        const response = await api.path("product/group/set", { product_id: model.id }).post({ body: { groups: groupIds } });
        if (response.data.result) {
          enqueueSnackbar("Promotion Group Successfully removed!", { variant: "success" });
          dispatch(Actions.Filter.reload({ key: "products" }));
        }
      }
    })
  }

  const handleDeleteDiscount = (ev) => {
    ev.stopPropagation();
    runRemove(async () => {
      if (model.group.type === "discount") {
        let { data: { result: { model: { products: discountProducts } } } } = await api.path("group/promotion_group/detail", { group_id: model.group.id }).get();
        let discountProductIds = [];
        (Object.keys(discountProducts)).forEach((key) => {
          if (discountProducts[key].id !== model.id) {
            discountProductIds.push(discountProducts[key].id);
          }
        });
        let body = {products: discountProductIds}
        const response = await api.path("group/promotion_group/product/update", { group_id: model.group.id}).post({ body });
        if (response.data.result) {
          enqueueSnackbar("Promotion Group Successfully removed!", { variant: "success" });
          dispatch(Actions.Filter.reload({ key: "products" }));
        }
      }
    })
  }

  const handleAdd = () => {
    setOpenAdd(false);
    dispatch(Actions.Filter.reload({ key: "products" }));
  }

  const disableLink = (ev) => {
    ev.stopPropagation();
  };

  useEffect(() => {
    if (model.group) {
      switch (model.group.type) {
        case "accessory":
          setDisableAccessory(true);
          setDisableDiscount(true);
          break;
        case "gift":
          setDisableGift(true);
          setDisableDiscount(true);
          break;
        default:
          break;
      }
    } else {
      setDisableAccessory(false);
      setDisableDiscount(false);
      setDisableGift(false);
    }
  }, [model.group])

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
        <TableCell className={classes.nameCell}>{model.name}</TableCell>
        <TableCell>{cashFormat(model?.price)}</TableCell>
        <TableCell>{model?.sku}</TableCell>
        <TableCell>{model?.upc}</TableCell>
        <TableCell>{quantityFormat(model?.stock)}</TableCell>
        <TableCell onClick={(ev) => disableLink(ev)}>
          <ToggleButtons
            labels={Platforms}
            initial={InitialValues}
            title={true}
            clickFunc={(value) => console.log(value)}
            responsive={false}
          />
        </TableCell>
        <TableCell onClick={(ev) => disableLink(ev)}>
          <ToggleButtons
            labels={Exports}
            initial={InitialValues}
            title={true}
            clickFunc={(value) => console.log(value)}
            responsive={false}
          />
        </TableCell>
        <TableCell className={classes.tagCell}>
          <div className={classes.tagContainer}>
            <Chip
              label={model.accessory.name ? model.accessory.name : "No Acc."}
              onClick={(ev) => handleClickTag(ev, "accessory")}
              onDelete={(ev) => handleDeleteTag(ev, model.accessory.id)}
              color="primary"
              disabled={disableAccessory}/>
            <Chip 
              label={model.gift.name ? model.gift.name : "No Gift"}
              onClick={(ev) => handleClickTag(ev, "gift")}
              onDelete={(ev) => handleDeleteTag(ev, model.gift.id)}
              color="primary"
              disabled={disableGift}/>
            <Chip 
              label={model.group?.type === "discount" ? model.group.name : "No Disc."}
              onClick={(ev) => handleClickTag(ev, "discount")}
              onDelete={(ev) => handleDeleteDiscount(ev)}
              color="primary"
              disabled={disableDiscount}/>
          </div>
        </TableCell>
      </TableRow>
      <AddDialog
        open={openAdd}
        type={type}
        product={model}
        handleClose={() => setOpenAdd(false)}
        handleAdd={handleAdd}
      />

    </Fragment>
  )
}

export default CatalogueItem;