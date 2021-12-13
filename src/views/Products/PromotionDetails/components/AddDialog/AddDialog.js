import { Grid, makeStyles } from "@material-ui/core";
import { Listing, PopUpDialog, SearchBar } from "components";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import useApi from "utils/api/useApi";
import { ButtonStyles, DialogStyles } from "utils/constants/styles";
import { useAsyncTask } from "utils/tools";
import { buttonConfig, fields } from "./addConfig";
import AddDialogItem from "./AddDialogItem";

const useStyles = makeStyles(theme => ({
  root: {
  },
  title: {
    paddingTop: 36,
    paddingBottom: 6,
    paddingLeft: 32,
    padding: "36px 32px 6px 32px",
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
  }
}));

const name = "products";

const AddDialog = (props) => {
  const { handleClose, open, model, handleAdd } = props;
  const api = useApi();
  const classes = useStyles();
  const [runUpdate ] = useAsyncTask("promotion-update");
  const checkedList = useSelector(state => state.Models.addPromotionProducts.checkedList);

  buttonConfig.add.onClick = (ev) => {
    ev.preventDefault();
    runUpdate(async () => {
      let prevList = model.products.map((product) => {
        return product.id;
      });
      let products = [ ...prevList ];
      checkedList.forEach((prev) => {
        if (prevList.indexOf(prev) === -1) {
          products.push(prev);
        }
      })
      let body = {
        products
      };
      const response = await api.path("group/promotion_group/product/update", { group_id: model.id }).post({ body });
      let result = response?.data?.result;
      if (result) {
        handleAdd(result);
      }
    });
  }; 

  return (
    <Fragment>
      <PopUpDialog
        title={
          <div className={classes.titleText}>
            Select Products
          </div>
        }
        content={
          <Fragment>
            <Listing
              name={name}
              path="product/list"
              fields={fields}
              dense
              pageRow
              hasCheck
              omitFalsyParams
              topElement={
                <Grid>
                  <SearchBar name={name} placeholder="Search Product" buttons={buttonConfig}/>
                </Grid>
              }
              itemComponent={AddDialogItem}
              errorMsg="Sorry, we cannot find any products. Please add some products or try searching again."
            />
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