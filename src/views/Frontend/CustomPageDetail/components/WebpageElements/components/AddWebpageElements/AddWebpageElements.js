import { makeStyles, Grid, TextField, CircularProgress, Box, Chip } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import clsx from "clsx";
import { ErrorMessage, ImageDropzone, InputGroup, LoadButton, PopUpDialog, EmptyState } from "components";
import { useSnackbar } from "notistack";
import { any } from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "store";
import useApi from "utils/api/useApi";
import { DialogStyles, DropzoneStyles } from "utils/constants/styles";
import useFormHandler from "utils/forms/useFormHandler";
import { useAsyncTask } from "utils/tools";
import { formStructure, messages } from "./addElementConfig";
import { productFeatureFormStructure, categoryFeatureFormStructure, productListingFormStructure, otherSettingsFormStructure } from "./elementOptionConfig";

const useStyles = makeStyles(theme => ({
  root: {},
  addContent: {
    maxHeight: 480,
  },
  ...DialogStyles,
  ...DropzoneStyles,
  back: {
    backgroundColor: "#F4F6F8",
  },
  textField: {
    margin: "2px 0px",
    width: "100%",
  },
  autoCompleteField: {
    margin: theme.spacing(1, 0),
  },
  chip: {
    margin: theme.spacing(2)
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  details: {
    padding: "8px 0px 16px",
  },
  imageZone: {
    marginTop: theme.spacing(2)
  }
}));

const AddWebpageElements = (props) => {
  const { open, handleClose, model: parent } = props;
  const api = useApi();
  const classes = useStyles();
  const [categories, setCategories] = useState(parent.categories || []);
  const [category, setCategory] = useState({});
  const [search, setSearch] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [options, setOptions] = useState([]);
  const [runCreate, load, error, setError] = useAsyncTask("element-create");
  const [runUpdate, updateLoad] = useAsyncTask("add-webpage-element");
  const [mainFormStructure, setMainFormStructure] = useState(formStructure);
  const [fields, values, errors, setValues, setErrors, setDirtys] = useFormHandler(mainFormStructure); // eslint-disable-line
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  useEffect(() => {
    getCategoryList();
    let initialState = Object.keys(mainFormStructure).reduce((acc, key) => {
      acc[key] = mainFormStructure[key].initialValue;
      return acc;
    }, {});
    setValues(initialState);
    setError(null);
    setErrors(null);
    setDirtys({});
  }, [open]); // eslint-disable-line

  useEffect(() => {
    if (values.type) {
      const defaultStructure = { ...formStructure, ...otherSettingsFormStructure };
      switch (values.type) {
        case "product-feature":
          setMainFormStructure({ ...defaultStructure, ...productFeatureFormStructure });
          break;
        case "category-feature":
          setMainFormStructure({ ...defaultStructure, ...categoryFeatureFormStructure });
          break;
        case "product-listing":
          setMainFormStructure({ ...defaultStructure, ...productListingFormStructure });
          break;
        case "review-slider":
          setMainFormStructure({ ...defaultStructure });
          break;
        default:
          setMainFormStructure(defaultStructure);
          break;
      }
    }
  }, [values.type]); // eslint-disable-line

  const getCategoryList = () => {
    runUpdate(async () => {
      const { data: { result: { models: response } } } = await api.path("classification/list", {}, { "category": any, search }).get();
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
    if (reason === "select-option") {
      if (!categories.find(cat => cat.id === value.id)) {
        setCategories([...categories, value]);
      }
    }
  }

  const handleChangeCategory = (e, value, reason) => {
    if (reason === "select-option") {
      setCategory(value);
    }
  }

  const handleDelete = (id) => {
    const index = categories.findIndex(cat => cat.id === id);
    let output = [...categories];
    if (index >= 0) {
      output.splice(index, 1);
      setCategories(output);
    }
  }

  const reload = () => {
    runUpdate(async () => {
      const { data: { result: { models: response } } } = await api.path("classification/list", {}, { "category": any, search }).get();
      setOptions(response);
    });
  }

  const handleCreate = (ev) => {
    ev.preventDefault();

    runCreate(async () => {
      const { type, link, position, image, count, description, title, disable_gutters, max_width, hide_bottom_divider } = values;
      const category_list = categories.map(category => category.id);
      const optionsValue = JSON.stringify({ category_id: category.id, count, description, title, category_list, disable_gutters, max_width, hide_bottom_divider });
      let body = {
        type, link, position, options: optionsValue
      };
      const response = await api.path("frontend/webpage/element", { webpage_id: parent.id }).post({ body });
      let model = response?.data?.result;
      if (model) {
        if (!image) {
          handleClose();
          enqueueSnackbar("Element Successfully Added!", { variant: "success" });
        } else {
          if (!image.type.match(/image.*/)) throw new Error("file not image");

          const formData = new FormData();
          formData.append("image", image);
          const result = await api.path("frontend/webpage/element/image", { element_id: model.id }).multipost({ body: formData });
          if (result?.data?.result) {
            handleClose();
            enqueueSnackbar("Element Successfully Added with Image!", { variant: "success" });
          }
        };
        dispatch(Actions.Filter.reload({ key: "pageElements" }));
      }
    });
  }

  return (
    <Fragment>
      <PopUpDialog
        title={
          <div className={classes.titleText}>
            Add Page Element
          </div>
        }
        content={
          <Fragment>
            <form onSubmit={handleCreate}>
              <ErrorMessage message={error?.message} map={messages} />
              <InputGroup
                className={classes.textField}
                fields={fields}
              />
              {(values?.type === "product-feature" || values?.type === "product-listing" || values?.type === "review-slider") && <Grid item xs={12}>
                <Autocomplete
                  className={classes.autoCompleteField}
                  fullWidth
                  open={openSearch && !updateLoad}
                  onOpen={() => setOpenSearch(true)}
                  onClose={() => setOpenSearch(false)}
                  getOptionLabel={(option) => option.name}
                  options={options}
                  onInputChange={onInput}
                  onChange={handleChangeCategory}
                  loading={updateLoad}
                  clearOnBlur
                  debug
                  clearOnEscape
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category"
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
              </Grid>}
              {values?.type === "category-feature" && <Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    className={classes.autoCompleteField}
                    fullWidth
                    open={openSearch && !updateLoad}
                    onOpen={() => setOpenSearch(true)}
                    onClose={() => setOpenSearch(false)}
                    getOptionLabel={(option) => option.name}
                    options={options}
                    onInputChange={onInput}
                    onChange={handleChange}
                    loading={updateLoad}
                    inputValue={search}
                    clearOnBlur
                    debug
                    clearOnEscape
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Category Lists"
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
                </Grid>
                <Box display="flex" justifyContent="center">
                  {categories?.map((category, index) => (
                    <Chip
                      key={index}
                      label={category.name}
                      color="primary"
                      className={classes.chip}
                      onDelete={() => handleDelete(category.id)}
                    />
                  ))}
                  <EmptyState active={!categories.length} message={"No linked categories"} />

                </Box>
              </Grid>}
              {(values?.type === "banner" || values?.type === "product-feature") && <ImageDropzone
                image={values.image || null}
                error={error}
                errors={errors}
                setError={setError}
                handleUpdate={(file) => { setValues({ ...values, image: file }) }}
                updateLabel="Confirm"
                className={clsx(classes.dropzone, classes.back, classes.imageZone)}
                mediaClass={clsx(classes.boxHeight, classes.media)}
                fileLoading={load}
                purpose="form"
                loaderClass={classes.boxHeight}
              />}
              <LoadButton
                variant="contained"
                padding={4}
                load={load}
                size="large"
                disabled={load}
                className={classes.submitButton}
                type="submit"
                color="secondary"
              >
                Add Element
              </LoadButton>
            </form>
          </Fragment>
        }
        open={open}
        handleClose={handleClose}
        titleClass={classes.title}
        contentClass={clsx(classes.content, classes.addContent)}
        className={classes.root}
      />
    </Fragment>
  )
};

export default AddWebpageElements;