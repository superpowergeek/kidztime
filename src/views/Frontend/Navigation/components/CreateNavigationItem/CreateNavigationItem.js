import { Box, Chip, CircularProgress, Grid, makeStyles, MenuItem, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import clsx from "clsx";
import { EmptyState, ErrorMessage, InputGroup, LoadButton, PopUpDialog } from "components";
import { useSnackbar } from "notistack";
import React, { Fragment, useEffect, useState } from "react";
import useApi from "utils/api/useApi";
import { DialogStyles, DropzoneStyles } from "utils/constants/styles";
import useFormHandler from "utils/forms/useFormHandler";
import { useAsyncTask } from "utils/tools";
import { formStructure, messages } from "./createNavigationItemConfig";

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
  submitButton: {
    marginTop: theme.spacing(2)
  },
  textField: {
    margin: "2px 0px",
  },
  iconBtn: {
    padding: "14px 12px",
    "&.Mui-expanded": {
      padding: 12,
    },
  },
  details: {
    padding: "8px 0px 16px",
  },
  subheader: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  field: {
    margin: theme.spacing(1, 0),
  },
  chip: {
    margin: theme.spacing(2)
  },
}));

const CreateNavigationItem = (props) => {
  const { open, handleClose } = props;
  const api = useApi();
  const classes = useStyles();
  const [runCreate, load, error, setError] = useAsyncTask("navigation-item-create");
  const [fields, values, errors, setValues, setErrors, setDirtys] = useFormHandler(formStructure); // eslint-disable-line
  const [categories, setCategories] = useState([]);
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [options, setOptions] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const reload = () => {
    runCreate(async () => {
      const { data: { result: { models: response } } } = await api.path("classification/list", {}, { type, search }).get();
      setOptions(response);
    });
  }

  const handleDelete = (id) => {
    const index = categories.findIndex(cat => cat.id === id);
    let output = [...categories];
    if (index >= 0) {
      output.splice(index, 1);
      setCategories(output);
    }
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

  useEffect(() => {
    // resetting form when modal is closed
    if (!open) {
      let initialState = Object.keys(formStructure).reduce((acc, key) => {
        acc[key] = formStructure[key].initialValue;
        return acc;
      }, {});
      setValues(initialState);
      setError(null);
      setErrors(null);
      setDirtys({})
    }
  }, [open]); // eslint-disable-line

  useEffect(() => {
    reload();
  }, [type]) // eslint-disable-line


  const handleCreate = (ev) => {
    ev.preventDefault();

    runCreate(async () => {
      const { ordering, title } = values;
      let body = {
        ordering, title, categories: categories.map(cat => cat.id)
      };
      await api.path("objectmeta/banner/create").post({ body });
      handleClose();
      enqueueSnackbar("Navigation Item Successfully Added!", { variant: "success" });
    });
  }

  return (
    <Fragment>
      <PopUpDialog
        maxWidth="md"
        title={
          <div className={classes.titleText}>
            Create Navigation Item
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

              <Typography variant="h6" className={classes.subheader}>Sub-items</Typography>

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

              <LoadButton
                fullWidth
                variant="contained"
                padding={4}
                load={load}
                size="large"
                disabled={load}
                className={classes.submitButton}
                type="submit"
                color="secondary"
              >
                Create Navigation Item
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

export default CreateNavigationItem;