import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { DeleteDialog, EmptyState, Listing, LoadButton, Page, RightLabelInputGroup } from "components";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "store";
import useApi from "utils/api/useApi";
import { ButtonStyles } from "utils/constants/styles";
import useGetDetail from "utils/customhooks/useGetDetail";
import useFormHandler from "utils/forms/useFormHandler";
import { useAsyncTask } from "utils/tools";
import { AddDialog, PromotionProductItem } from "./components";
import { formStructure, listingFields, pagesNav } from "./promotionDetailsConfig";

const useStyles = makeStyles(theme => ({
  topContainer: {
    padding: theme.spacing(3)
  },
  bottomContainer: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-between"
  },
  bottomSubContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap"
  },
  listsContainer: {
    marginTop: theme.spacing(3)
  },
  textField: {
    margin: "2px 0px",
    width: "100%",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: theme.spacing(3) 
  },
  tableContainer: {
    display: "flex",
    overflowX: "auto"
  },
  deleteButton: {
    ...ButtonStyles.DELETE.style,
  },
  submitButton: {
    marginLeft: theme.spacing(3)
  },
  subtitle: {
    color: "#757575"
  }
}));

const parseModel = (model) => {

  return model;
};

const PromotionDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const api = useApi();
  const { enqueueSnackbar } = useSnackbar();
  const [runUpdate] = useAsyncTask("promotion-update");
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const del = () => {
    return api.path("group/promotion_group/delete", { group_id: model.id }).del();
  }
  const [model, loading, error, setModel] = useGetDetail("group/promotion_group/detail", "groups", "group_id", parseModel); // eslint-disable-line
  
  const [fields, values, errors, setValues, setErrors, setDirtys] = useFormHandler(formStructure, model); // eslint-disable-line

  const handleUpdate = (e) => {
    e.preventDefault();
    runUpdate(async () => {
      const { type, name, handle, description, discount_type, discount_value, start_at, end_at, published } = values;
      let body = {
        type, name, handle, description, discount_type, discount_value, start_at, end_at, published
      };
      const response = await api.path("group/promotion_group/update", {group_id: model.id}).put({ body });
      let result = response?.data?.result;
      if (result) {
        enqueueSnackbar("Promotion Group Successfully Updated!", { variant: "success" });
      }
    });
  }

  const handleDelete = () => {
    enqueueSnackbar("Promotion Group Successfully Deleted!", { variant: "success" });
    dispatch(Actions.Filter.reload({ key: "promotionGroups" }));
  }
  const handleAdd = (result) => {
    setModel();
    dispatch(Actions.Models.update({ key: "addPromotionProducts", value: { checkedList: [] } }))
    dispatch(Actions.Filter.reload({ key: "promotionProducts" }));
    enqueueSnackbar("Promotion Group Successfully Updated!", { variant: "success" });
    setOpenAdd(false);
  }

  const reloadItemFunc = (props) => {
    setModel();
  }

  useEffect(() => {
    if (!model) return;
    let updatedValues = Object.keys(formStructure).reduce((acc, key) => {
      acc[key] = model[key];
      return acc;
    }, {})
    setValues(updatedValues);
  },[model]) // eslint-disable-line

  return (
    <Page title="Promotion Group Details" dashboard={true} pagesNav={pagesNav}>
      <Paper elevation={1} className={classes.topContainer}>
        <form onSubmit={(e) => { handleUpdate(e) }} className={classes.formContainer}>
          <Typography variant="h5" gutterBottom>
            Promotion Basic Attributes
          </Typography>
          <Grid sm={12} md={6} item={true}>
            <RightLabelInputGroup
              className={classes.textField}
              fields={fields}
            />
          </Grid>
          <Grid className={classes.btnContainer}>
            <LoadButton
              variant="contained"
              padding={4}
              size="medium"
              className={classes.deleteButton}
              onClick={() => {setOpenDelete(true)}}
              >
              Delete Promotion
            </LoadButton>
            <LoadButton
                variant="contained"
                padding={4}
                size="medium"
                type="submit"
                className={classes.submitButton}
              >
                Update Attributes
            </LoadButton>
          </Grid>
        </form>
      </Paper>
      <Paper elevation={1} className={classes.bottomContainer}>
        <Grid className={classes.bottomSubContainer}>
          <Grid>
            <Typography variant="h5" gutterBottom>
                Promotion Products
            </Typography>
            <Typography gutterBottom className={classes.subtitle}>
                {model && model.products.length ? `${model.products.length} product(s) in total` : "No products added"}
            </Typography>
          </Grid>
          <Grid>
            <LoadButton
                variant="contained"
                size="medium"
                className={classes.deleteButton}
                onClick={() => {setOpenAdd(true)}}
              >
                Add SKU
            </LoadButton>
          </Grid>
        </Grid>
        <Grid className={classes.tableContainer}>
          {model?.products?.length > 0 ? <Listing 
            name="promotionProducts"
            path="group/promotion_group/detail"
            fields={listingFields}
            params={{group_id: model.id}}
            hasCheck
            dense
            pageRow
            omitFalsyParams
            reloadItemFunc={reloadItemFunc}
            itemComponent={PromotionProductItem}
          /> : <EmptyState active message={"No products found"} />}
        </Grid>
      </Paper>
      <DeleteDialog
        name="promotionGroups"
        redirect="/promotion-settings/list"
        del={del}
        open={openDelete}
        handleDelete={handleDelete}
        handleClose={() => setOpenDelete(false)}
      />
      <AddDialog 
        name="promotionProducts"
        open={openAdd}
        handleAdd={handleAdd}
        handleClose={() => setOpenAdd(false)}
        model={model}
      />
    </Page>
  )
}

export default PromotionDetails;