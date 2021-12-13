import { CircularProgress, makeStyles, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { LoadButton, PopUpDialog } from "components";
import { useSnackbar } from "notistack";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import useApi from "utils/api/useApi";
import { ButtonStyles, DialogStyles } from "utils/constants/styles";
import { useAsyncTask } from "utils/tools";

const useStyles = makeStyles(theme => ({
  root: {
  },
  title: {
    paddingTop: 36,
    paddingBottom: 6,
    paddingLeft: 32,
    padding: "36px 32px 6px 32px",
    marginTop: 36
  },
  titleText: DialogStyles.titleText,
  content: {
    paddingLeft: theme.spacing(4),
    paddingBottom: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
  contentBox: {
    fontSize: 14,
  },
  submitButton: {
    ...ButtonStyles.DELETE.style,
    width: "100%",
    marginTop: 36,
  },
  error: {
    marginBottom: theme.spacing(2),
  },
  select: {
    width: "100%"
  }
}));

const AddDialog = (props) => {
  const { handleClose, open, product, type, handleAdd } = props;
  const api = useApi();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);
  const [runAdd] = useAsyncTask("add-promotion-group-to-product");
  const [runUpdate, updateLoad] = useAsyncTask("get-promotion-group-list");
  const [ selectedGroup, setSelectedGroup] = useState("");

  const onInput = (e, v, reason) => {
    if (reason === "input") {
      setSearch(v)
    } else if (reason === "reset") {
      setSearch("");
      setOpenSearch(false);
    }
  }

  const handleChange = (e, value, reason) => {
    if (reason === "select-option") {
      if (selectedGroup.id !== value.id) {
        setSelectedGroup(value);
      }
    }
  }

  const reload = () => {
    runUpdate(async () => {
      const { data: { result: { models: response } } } = await api.path("group/promotion_group/list", {}, { type, search }).get();
      setOptions(response);
    });
  }

  const handleUpdate = useCallback((ev) => {
    ev.preventDefault();
    runAdd(async () => {
      if (type === "discount") {
        if (product.group) {
            // first remove product from previous Discount Group.
          let { data: { result: { model: { products: discountProducts } } } } = await api.path("group/promotion_group/detail", { group_id: product.group.id }).get();
          let discountProductIds = [];
          Object.keys(discountProducts).forEach((key) => {
            if (discountProducts[key].id !== product.id) {
              discountProductIds.push(discountProducts[key].id);
            }
          });
          let body = {products: discountProductIds};
          const deleteRes = await api.path("group/promotion_group/product/update", { group_id: product.group.id}).post({ body });
          if (deleteRes.data.result) {
            //second add product to new Discount Group.
            let { data: { result: { model: { products: newDiscountProducts } } } } = await api.path("group/promotion_group/detail", { group_id: selectedGroup.id }).get();
            let newDiscountProductIds = [];
            if (Object.keys(newDiscountProducts).length > 0) {
              Object.keys(newDiscountProducts).forEach((key) => {
                if (newDiscountProducts[key].id !== product.id) {
                  newDiscountProductIds.push(newDiscountProducts[key].id);
                }
              });
            } else {
              newDiscountProductIds.push(product.id);
            }
            body = {products: newDiscountProductIds};
            const addRes = await api.path("group/promotion_group/product/update", { group_id: selectedGroup.id}).post({ body });
            if (addRes.data.result) {
              enqueueSnackbar("Promotion Group Successfully Added!", { variant: "success" });
              handleAdd();
            }
          }
        } else {
          let { data: { result: { model: { products: newDiscountProducts } } } } = await api.path("group/promotion_group/detail", { group_id: selectedGroup.id }).get();
          let newDiscountProductIds = [];
          if (Object.keys(newDiscountProducts).length > 0) {
            Object.keys(newDiscountProducts).forEach((key) => {
              if (newDiscountProducts[key].id !== product.id) {
                newDiscountProductIds.push(newDiscountProducts[key].id);
              }
            });
          } else {
            newDiscountProductIds.push(product.id);
          }
          let body = {products: newDiscountProductIds};
          const addRes = await api.path("group/promotion_group/product/update", { group_id: selectedGroup.id}).post({ body });
          if (addRes.data.result) {
            enqueueSnackbar("Promotion Group Successfully Added!", { variant: "success" });
            handleAdd();
          }
        }
      } else {
        let { data: { result: { model: productGroups } } } = await api.path("product/group/get", { product_id: product.id }).get();
        let replaceId = 0;
        let groupIds = [];
        productGroups.forEach(group => {
          if (group.published) {
            groupIds.push(group.id);
            if (group.type===type) {
              replaceId = group.id;
            }
          }
        });
        if (replaceId) {
          groupIds[groupIds.indexOf(replaceId)] = selectedGroup.id;
        } else {
          groupIds.push(selectedGroup.id);
        }
        const response = await api.path("product/group/set", { product_id: product.id }).post({ body: { groups: groupIds } });
        if (response.data.result) {
          enqueueSnackbar("Promotion Group Successfully Added!", { variant: "success" });
          handleAdd();
        }
      }
    })
  }, [selectedGroup]);  // eslint-disable-line
  
  useEffect(() => {
    reload();
  }, [open, search]) // eslint-disable-line

  return (
    <Fragment>
      <PopUpDialog
        title={
          <div className={classes.titleText}>
            Select Promotion Groups
          </div>
        }
        content={
          <Fragment>
            <Autocomplete
              className={classes.select}
              fullWidth
              open={openSearch && !updateLoad}
              onOpen={() => setOpenSearch(true)}
              onClose={() => setOpenSearch(false)}
              getOptionLabel={(option) => option?.name ? option.name : ""}
              options={options}
              onInputChange={onInput}
              onChange={handleChange}
              loading={updateLoad}
              debug
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Add Classification"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <Fragment>
                        {updateLoad ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </Fragment>
                    ),
                  }}
                />
              )}
            />
            <LoadButton
              variant="contained"
              padding={4}
              size="large"
              className={classes.submitButton}
              color="primary"
              onClick={handleUpdate}
              >
                Add Promotion Group
              </LoadButton>
          </Fragment>
        }
        open={open}
        handleClose={handleClose}
        titleClass={classes.title}
        contentClass={classes.content}
        className={classes.root}
        fullWidth={true}
      />
    </Fragment>
  );
};

export default AddDialog;