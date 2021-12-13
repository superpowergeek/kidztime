import { makeStyles } from "@material-ui/core";
import { FormBlock, PopUpDialog } from "components";
import { useSnackbar } from "notistack";
import React, { Fragment, useEffect } from "react";
import useApi from "utils/api/useApi";
import { DialogStyles } from "utils/constants/styles";
import useFormHandler from "utils/forms/useFormHandler";
import { useAsyncTask } from "utils/tools";
import { formStructure, messages } from "./createDialogConfig";

const useStyles = makeStyles(theme => ({
  root: {},
  ...DialogStyles,
  content: {
    maxHeight: 480,
    padding: "8px 24px 24px",
  },
  error: {
    marginBottom: 14,
  }
}));

const CreateDialog = (props) => {
  const { open, handleClose } = props;
  const classes = useStyles();
  const api = useApi();
  const [runCreate, loading, error, setError] = useAsyncTask("account-create");
  const [fields, values, errors, setValues, setErrors, setDirtys] = useFormHandler(formStructure);
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

  const handleCreate = (event) => {

    event && event.preventDefault();

    if (errors) return;
    runCreate(async () => {
      const { firstname, lastname, phone_number, email_address, delivery_address, postal_code, new_password } = values;
      const body = {
        "user": {
          firstname, lastname, phone_number, email_address, delivery_address, postal_code, "password": new_password
        }
      };
      await api.path("account/create").post({ body });
      enqueueSnackbar("Customer Successfully Created!", { variant: "success" });

      handleClose();
      
    });
  }

  return (
    <Fragment>
      <PopUpDialog
        title={
          <div className={classes.titleText}>
            Create Customer
          </div>
        }
        content={
          <FormBlock
            handleSubmit={handleCreate}
            error={error}
            messages={messages}
            fields={fields}
            errors={errors}
            loading={loading}
            buttonTitle="Create Customer"
            errorClass={classes.error}
          />
        }
        open={open}
        handleClose={handleClose}
        titleClass={classes.title}
        contentClass={classes.content}
        className={classes.root}
      />
    </Fragment>
  );
};

export default CreateDialog;