import { Box, Button, Chip, CircularProgress, Grid, makeStyles, MenuItem, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { EmptyState, ErrorMessage, PopUpDialog } from "components";
import { useSnackbar } from "notistack";
import React, { Fragment, useEffect, useState } from "react";
import useApi from "utils/api/useApi";
import { DialogStyles, DropzoneStyles, submitButton } from "utils/constants/styles";
import { useAsyncTask } from "utils/tools";

const useStyles = makeStyles(theme => ({
  root: {},
  ...DialogStyles,
  ...DropzoneStyles,
  chip: {
    margin: theme.spacing(2)
  },
  submitButton: submitButton,
  field: {
    margin: theme.spacing(1, 0),
  },
}));

const EditProductClassification = (props) => {

  const { open, handleClose, model, setModel } = props;

  const classes = useStyles();
  const api = useApi();
  const [categories, setCategories] = useState(model.categories || []);
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [options, setOptions] = useState([]);
  const [runUpdate, load, error] = useAsyncTask("edit-product-classification");
  const { enqueueSnackbar } = useSnackbar();

  const messages = {
  }

  const handleDelete = (id) => {
    const index = categories.findIndex(cat => cat.id === id);
    let output = [...categories];
    if (index >= 0) {
      output.splice(index, 1);
      setCategories(output);
    }
  }

  const update = (file) => {
    runUpdate(async () => {

      const body = {
        categories: categories.map(cat => cat.id)
      }
      const { data: { result: { model: response } } } = await api.path("product/category", { product_id: model.id }).post({ body });
      setModel(response)
      enqueueSnackbar("Product Classification updated!", { variant: "success" });
      handleClose();
    });
  };

  useEffect(() => {
    if (open) setCategories(model.categories || []);
  }, [open]); // eslint-disable-line

  const reload = () => {
    runUpdate(async () => {
      const { data: { result: { models: response } } } = await api.path("classification/list", {}, { type, search }).get();
      setOptions(response);
    });
  }

  useEffect(() => {
    reload();
  }, [type]) // eslint-disable-line

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

  return (
    <Fragment>
      <PopUpDialog
        title={
          <div className={classes.titleText}>
            Edit Product Classification
          </div>
        }
        content={
          <Fragment>
            <ErrorMessage message={error?.message} map={messages} />
            {/* <Typography variant="h6">Add Classifications</Typography> */}
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  className={classes.field}
                  fullWidth
                  value={type}
                  onChange={e => setType(e.target.value)}
                  label="Type"
                  select
                  SelectProps={{ displayEmpty: true }}
                  InputLabelProps={{ shrink: true }}
                >
                  <MenuItem value="">
                    All
                </MenuItem>
                  <MenuItem value="character">
                    Character
                </MenuItem>
                  <MenuItem value="category">
                    Category
                </MenuItem>
                  <MenuItem value="product_type">
                    Product Type
                </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                {/* <TextField
                  fullWidth
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  label="Search"
                /> */}
                <Autocomplete
                  className={classes.field}
                  fullWidth
                  open={openSearch && !load}
                  onOpen={() => setOpenSearch(true)}
                  onClose={() => setOpenSearch(false)}
                  getOptionLabel={(option) => option.name}
                  options={options}
                  onInputChange={onInput}
                  onChange={handleChange}
                  loading={load}
                  inputValue={search}
                  clearOnBlur
                  debug
                  clearOnEscape
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Add Classification"
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
              <EmptyState active={!categories.length} message={"No linked classifications"} />

            </Box>
            <Button
              onClick={update}
              variant="contained"
              size="large"
              className={classes.submitButton}
              disabled={load}
              type="submit"
              color="secondary">
              Update Classification
            </Button>
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

export default EditProductClassification;