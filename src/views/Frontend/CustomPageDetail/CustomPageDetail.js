import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { DeleteDialog, EmptyState, ErrorMessage, Loader, Page, RenderGuard } from "components";
import React, { Fragment, useState } from "react";
import useApi from "utils/api/useApi";
import { ButtonProps, ButtonStyles } from "utils/constants";
import useGetDetail from "utils/customhooks/useGetDetail";
import { PageInfo, WebpageElements } from "./components";
import { pagesNav } from "./customPageDetailConfig";

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

const CustomPageDetail = () => {

  const api = useApi();
  const classes = useStyles();

  const [remove, setRemove] = useState(false);
  const [model, loading, error, setModel] = useGetDetail("frontend/webpage/detail", "pages", "webpage_id", parseModel);

  const del = () => {
    if (model.id) {
      return api.path("frontend/webpage/delete", { webpage_id: model.id }).del();
    }
  };

  return (
    <Fragment>
      <Page title="Customised Page Details" dashboard={true} pagesNav={pagesNav}>
        <RenderGuard renderIf={model}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h3">{model?.title}</Typography>
              <Typography variant="subtitle1">{model?.path}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className={classes.buttonSet}>
                <Button
                  className={classes.delete}
                  {...ButtonProps}
                  startIcon={<DeleteIcon />}
                  onClick={() => setRemove(true)}
                >
                  Delete Customisation
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} className={classes.gridMargin}>
              <PageInfo model={model} setModel={setModel} />
            </Grid>
            <Grid item xs={12} sm={6} md={8} className={classes.gridMargin}>
              <WebpageElements model={model} setModel={setModel} />
            </Grid>
          </Grid>
        </RenderGuard>
        <Loader loading={loading} size={40} thickness={4} />
        <EmptyState active={!loading && !model} message="Sorry, we couldn't find a product with this ID. Please verify if this product still exists" />
        <ErrorMessage message={error?.message} />
      </Page>
      <DeleteDialog
        name="Customisation"
        redirect="/frontend/pages/list"
        del={del}
        open={remove}
        handleClose={() => setRemove(false)}
      />
    </Fragment>
  );
};

export default CustomPageDetail;