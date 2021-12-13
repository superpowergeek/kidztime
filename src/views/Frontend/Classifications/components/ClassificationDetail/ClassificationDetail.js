import { CircularProgress, makeStyles, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Listing, Page, SearchBar, SectionPaper } from "components";
import { useSnackbar } from "notistack";
import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "store";
import useApi from "utils/api/useApi";
import { useAsyncTask, useRouter } from "utils/tools";
import { fields } from "./classificationDetailConfig";
import { ClassificationProduct } from "./components";

const useStyles = makeStyles(theme => ({
  addBox: {
    margin: theme.spacing(2, 0)
  }
}));

const Classifications = (props) => {
  let router = useRouter();
  let id = router?.match?.params.classification_id;
  const [openSearch, setOpenSearch] = useState(false);
  const [options, setOptions] = useState([]);
  const [run, load] = useAsyncTask("load-product");
  const [runUpdate] = useAsyncTask("update-product-classification");
  const [search, setSearch] = useState("");
  const api = useApi();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const reload = () => {
    run(async () => {
      const { data: { result: { models: response } } } = await api.path("product/list", {}, { search }).get();
      setOptions(response);
    });
  }

  const onInput = (e, v, reason) => {
    if (reason === "input") {
      setSearch(v)
    } else if (reason === "reset") {
      setSearch("");
      setOpenSearch(false);
    }
  }

  const handleChange = (e, value, reason) => {
    if (typeof parseInt(id) !== "number") return;
    if (value.categories.find(cat => cat.id === parseInt(id))) {
      return enqueueSnackbar("Product already added to classification", { variant: "warning" });
    }
    runUpdate(async () => {
      const body = { categories: [...value.categories ? value.categories.map(c => c.id) : [], parseInt(id)] };
      await api.path("product/category", { product_id: value.id }).post({ body });
      enqueueSnackbar("Product added to classification!", { variant: "success" });
      dispatch(Actions.Filter.reload({ key: "classificationProduct" }));

    });
  }

  return (
    <Page title="Classifications" dashboard={true}>
      <SectionPaper className={classes.addBox} title="Add Product to Classification">
        <Autocomplete
          fullWidth
          open={openSearch && !load}
          onOpen={() => { setOpenSearch(true); reload(); }}
          onClose={() => setOpenSearch(false)}
          getOptionLabel={(option) => option.name}
          options={options}
          onInputChange={onInput}
          onChange={handleChange}
          loading={load}
          inputValue={search}
          clearOnBlur
          clearOnEscape
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Product"
              variant="outlined"
              onChange={() => reload()}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <Fragment>
                    {load ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </Fragment>
                ),
              }}
            />
          )}
        />
      </SectionPaper>
      <Listing
        name="classificationProduct"
        path="classification/product/list"
        params={{ category_id: id }}
        fields={fields}
        dense
        pageRow
        headRow
        topElement={
          <SearchBar name="classificationProduct" placeholder="Search Product" />
        }
        itemComponent={ClassificationProduct}
        errorMsg="Sorry, we cannot find any products."
      />,
    </Page>
  );
}

export default Classifications;