import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core";
import { FormBlock } from "components";
import PropTypes from "prop-types";
import useApi from "utils/api/useApi";
import { useAsyncTask } from "utils/tools";
import useFormHandler from "utils/forms/useFormHandler";
import { submitButton } from "utils/constants/styles";
import clsx from "clsx";
import { formStructure, messages } from "./passwordResetConfig";

const useStyles = makeStyles(theme => ({
  root: {},
  textField: {
    width: "100%",
    "&:last-of-type": {
      marginTop: theme.spacing(1),
    },
    marginBottom: theme.spacing(1)
  },
  submitButton: submitButton
}));

const PasswordResetForm = (props) => {

  const { className, token, onPasswordReset } = props;

  const classes = useStyles();
  const api = useApi();

  const [runReset, loading, error] = useAsyncTask("password-reset");
  const [fields, values, errors] = useFormHandler(formStructure);

  const handleSubmit = event => {

    event && event.preventDefault();

    if (errors) return;
    runReset(async () => {
      const { new_password } = values;
      const body = {
        "token": token,
        "password": new_password
      };
      const response = await api.path("password/reset").post({ body });
      if (response?.data?.result) {
        onPasswordReset(true);
      }
    });

  };

  return (
    <Fragment>
      <FormBlock
        className={clsx(className, classes.root)}
        handleSubmit={handleSubmit}
        error={error}
        messages={messages}
        fields={fields}
        errors={errors}
        loading={loading}
        buttonTitle="Submit"
      />
    </Fragment>
  );
};

PasswordResetForm.propTypes = {
  className: PropTypes.string,
  // token: PropTypes.string.isRequired,
  onPasswordReset: PropTypes.func.isRequired,
};

export default PasswordResetForm;