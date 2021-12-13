import React, { Fragment, useState } from "react";
import { DeleteDialog, EmptyState, Page, Loader, RenderGuard, ErrorMessage } from "components";
import { makeStyles, Button, Grid, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { ButtonStyles, ButtonProps } from "utils/constants";
import { pagesNav } from "./productDetailConfig";
import { ImageGallery, ImagePreview, ListPlatforms, ProductInfo, ProductClassification } from "./components";
import useApi from "utils/api/useApi";
import useGetDetail from "utils/customhooks/useGetDetail";

const useStyles = makeStyles(theme => ({
  gridMargin: {
    marginTop: theme.spacing(3),
  },
  buttonSet: {
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.only("xs")]: {
      display: "block",
      marginTop: theme.spacing(1),
    },
  },
  delete: {
    ...ButtonStyles.DELETE.style,
    padding: theme.spacing(1, 2),
  },
  marginTop: {
    marginTop: theme.spacing(1),
  },
}));

const parseModel = (model) => {
  model.description = model?.product_info?.description;
  return model;
};

const ProductDetail = () => {

  const api = useApi();
  const classes = useStyles();

  const [remove, setRemove] = useState(false);
  const [model, loading, error, setModel] = useGetDetail("product/detail", "products", "product_id", parseModel);

  const del = () => {
    if (model.id) {
      return api.path("product/delete", { product_id: model.id }).del();
    }
  };

  return (
    <Fragment>
      <Page title="Product Details" dashboard={true} pagesNav={pagesNav}>
        <RenderGuard renderIf={model}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h3">{model?.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className={classes.buttonSet}>
                <Button
                  className={classes.delete}
                  {...ButtonProps}
                  startIcon={<DeleteIcon />}
                  onClick={() => setRemove(true)}
                >
                  Delete Product
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} className={classes.gridMargin}>
              <ImagePreview model={model} setModel={setModel} />
              <ListPlatforms className={classes.marginTop} />
            </Grid>
            <Grid item xs={12} sm={6} md={8} className={classes.gridMargin}>
              <ProductInfo model={model} setModel={setModel} />
              <ProductClassification model={model} setModel={setModel} className={classes.marginTop} />
              <ImageGallery model={model} setModel={setModel} className={classes.marginTop} />
            </Grid>
          </Grid>
        </RenderGuard>
        <Loader loading={loading} size={40} thickness={4} />
        <EmptyState active={!loading && !model} message="Sorry, we couldn't find a product with this ID. Please verify if this product still exists" />
        <ErrorMessage message={error?.message} />
      </Page>
      <DeleteDialog
        name="Product"
        redirect="/products/catalogue/list"
        del={del}
        open={remove}
        handleClose={() => setRemove(false)}
      />
    </Fragment>
  );
};

export default ProductDetail;