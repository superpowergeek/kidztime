import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { FormBlock } from "components";
import { useSnackbar } from "notistack";
import { default as React, Fragment, useEffect, useState } from "react";
import useApi from "utils/api/useApi";
import { submitButton } from "utils/constants/styles";
import useFormHandler from "utils/forms/useFormHandler";
import { useAsyncTask } from "utils/tools";
import { formStructure, messages } from "./linkConfig";
import { Actions } from "store";
import { useDispatch } from "react-redux";
import { useFilter } from "utils/filter";

const useStyles = makeStyles(theme => ({
  root: {},
  error: {
    marginBottom: theme.spacing(3),
  },
  textField: {
    margin: theme.spacing(1, 0),
    width: "100%",
  },
  submitButton: submitButton
}));

const LinkForm = (props) => {
  const { className } = props;

  const api = useApi();
  const classes = useStyles();
  const [fields, values, errors, setInputs, setErrors, setDirtys] = useFormHandler(formStructure);
  const { enqueueSnackbar } = useSnackbar();
  const [runLinkClassification, linkLoading, linkError] = useAsyncTask("classification-link");
  const [runListProduct, productLoading, productError] = useAsyncTask("list-product");
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [filter, updateFilter, listenFilter] = useFilter("classificationProductType"); // eslint-disable-line
  const dispatch = useDispatch();

  useEffect(() => {
    const typeField = fields.find(f => f.key === "type");
    if (typeField) {
      runListProduct(async () => {
        const productResult = await api.path(`classification/list`, {}, { type: "product_type" }).get();
        const products = productResult.data?.result?.models;
        setProductList(products);
        for (const p in products) {
          typeField.options[p] = products[p].name;
        }
      });
    }
    const categoryField = fields.find(f => f.key === "category");
    if (categoryField) {
      runListProduct(async () => {
        const categoryResult = await api.path(`classification/list`, {}, { type: "category" }).get();
        const categories = categoryResult.data?.result?.models;
        setCategoryList(categories);
        for (const c in categories) {
          categoryField.options[c] = categories[c].name;
        }
      });
    }
  }, [...listenFilter]) // eslint-disable-line

  const handleSubmit = event => {
    event && event.preventDefault();
    if (errors) return;
    runLinkClassification(async () => {
      const { category, type } = values;
      const parent_id = categoryList.find(p => p.name === category).id;
      const child_id = productList.find(p => p.name === type).id;

      const body = {
        parent_id, // category id
        child_id, // product_type id
        type: "category"
      }
      await api.path("classification/link/create").post({ body });
      enqueueSnackbar("Successfully Linked!", { variant: "success" });
      dispatch(Actions.Filter.reload({ key: "classificationProductType" }));
      setDirtys({});
      setInputs({ type: "", category: "" });
      setErrors({});
    });
  };

  return (
    <Fragment>
      <FormBlock
        className={clsx(className, classes.root)}
        handleSubmit={handleSubmit}
        error={linkError || productError}
        messages={messages}
        fields={fields}
        errors={errors}
        loading={linkLoading || productLoading}
        buttonTitle="Link"
        errorClass={classes.error}
      />
    </Fragment>
  );
};

export default LinkForm;