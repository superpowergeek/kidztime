import { makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import { ErrorMessage, InputGroup, LoadButton, PopUpDialog } from "components";
import { useSnackbar } from "notistack";
import React, { Fragment, useEffect } from "react";
import useApi from "utils/api/useApi";
import { DialogStyles, DropzoneStyles } from "utils/constants/styles";
import useFormHandler from "utils/forms/useFormHandler";
import { useAsyncTask } from "utils/tools";
import { formStructure, messages } from "./createCustomisedPageConfig";

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
}));

const CreateCustomisedPage = (props) => {
  const { open, handleClose } = props;
  const api = useApi();
  const classes = useStyles();
  const [runCreate, load, error, setError] = useAsyncTask("page-create");
  const [fields, values, errors, setValues, setErrors, setDirtys] = useFormHandler(formStructure); // eslint-disable-line
  const { enqueueSnackbar } = useSnackbar();

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


  const handleCreate = (ev) => {
    ev.preventDefault();

    runCreate(async () => {
      const { path, title, description } = values;
      let body = {
        path, title, description
      };
      const response = await api.path("frontend/webpage/create").post({ body });
      let model = response?.data?.result?.model;
      if (model) {
        handleClose();
        enqueueSnackbar("Customised Page Successfully Added!", { variant: "success" });
      }
    });
    return false;
  }

  return (
    <Fragment>
      <PopUpDialog
        maxWidth="md"
        title={
          <div className={classes.titleText}>
            Create Customised Page
          </div>
        }
        content={
          <Fragment>
            <form onSubmit={handleCreate}>
              <ErrorMessage message={error?.message} map={messages} />
              <Typography variant="caption">
                To begin, enter the relative path of the URL you want to customise. e.g. /product/kidztime-bag
              </Typography>
              <InputGroup
                className={classes.textField}
                fields={fields}
              />

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
                Create Customised Page
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

export default CreateCustomisedPage;