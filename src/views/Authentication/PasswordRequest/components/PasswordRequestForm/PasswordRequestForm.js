import React, { useState } from "react";
import { Button, Typography } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import { ErrorMessage, InputGroup, RenderGuard, StatusChip } from "components";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import useApi from "utils/api/useApi";
import { ButtonProps, submitButton } from "utils/constants";
import { useAsyncTask } from "utils/tools";
import useFormHandler from "utils/forms/useFormHandler";
import { formStructure, messages } from "./passwordRequestConfig";

const useStyles = makeStyles(theme => ({
  root: {},
  error: {
    marginBottom: theme.spacing(3),
  },
  chip: {
    marginBottom: theme.spacing(2),
  },
  chipRoot: {
    color: theme.palette.success.main,
  },
  message: {
    marginBottom: 18,
  },
  submitButton: submitButton,
  textField: {
    width: "100%",
  }
}));

const PasswordRequestForm = (props) => {

  const { className, ...rest } = props;

  const classes = useStyles();
  const api = useApi();

  const [success, setSuccess] = useState(false);
  const [runRequest, loading, error] = useAsyncTask("password-request");
  const [fields, values, errors] = useFormHandler(formStructure);

  const handleSubmit = event => {
    event && event.preventDefault();

    if (errors) return;
    runRequest(async () => {
      const { email } = values;
      const body = {
        "username": email,
        "cms": "true",
      };
      const response = await api.path("password/request").post({ body });
      if (response.data.result) {
        setSuccess(true);
      };
    });

  };

  return (
    <form
      {...rest}
      className={clsx(classes.root, className)}
      onSubmit={handleSubmit}>

      <RenderGuard renderIf={success}>
        <StatusChip
          icon={
            <CheckIcon className={classes.chipRoot} />
          }
          message="Password Request Success"
          className={classes.chip}
          status="success" />
        <Typography variant="subtitle2" className={classes.message}>Your password reset request has been submitted. You will receive the instructions to reset your password shortly.</Typography>
      </RenderGuard>

      <RenderGuard renderIf={!success}>
        <ErrorMessage message={error?.message} map={messages} className={classes.error} />
        <InputGroup
          className={classes.textField}
          fields={fields}
          onKeyPress={(ev) => {
            if (ev.key === "Enter") {
              handleSubmit(ev);
              ev.preventDefault();
            }
          }} />
        <Button
          {...ButtonProps}
          className={classes.submitButton}
          disabled={loading}
          type="submit"
        >REQUEST</Button>
      </RenderGuard>

    </form>
  );
};

export default PasswordRequestForm;