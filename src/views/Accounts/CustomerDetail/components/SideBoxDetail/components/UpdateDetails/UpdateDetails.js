import { makeStyles } from "@material-ui/core";
import { ErrorMessage, InputGroup, LoadButton, SideBox } from "components";
import { useSnackbar } from "notistack";
import React, { Fragment } from "react";
import useApi from "utils/api/useApi";
import { submitButton } from "utils/constants/styles";
import useFormHandler from "utils/forms/useFormHandler";
import { useAsyncTask } from "utils/tools";
import { formStructure, messages } from "./updateDetailsConfig";

const useStyles = makeStyles(theme => ({
  customer: {
    marginBottom: theme.spacing(4),
  },
  textField: {
    width: "100%",
    "&:last-of-type": {
      marginTop: theme.spacing(1),
    },
    marginBottom: theme.spacing(1),
  },
  submitButton: submitButton,
}));

const UpdateDetails = (props) => {
  const { user, setUser } = props;

  const api = useApi();
  const classes = useStyles();
  const [runUpdate, loading, error] = useAsyncTask("account-update");
  const [fields, values, errors] = useFormHandler(formStructure, user);
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = (event) => {

    event && event.preventDefault();

    if (errors) return;
    runUpdate(async () => {
      const { firstname, lastname, phone_number, email_address, delivery_address, postal_code } = values;
      const body = {
        firstname, lastname, phone_number, email_address, delivery_address, postal_code
      };
      const response = await api.path("account/update", { account_id: user.id }).post({ body });
      const newUser = response?.data?.result?.model
      setUser(newUser);
      enqueueSnackbar("Account successfully updated!", { variant: "success" });
    });

  };

  if (!user) return null;

  return (
    <Fragment>
      <SideBox title="Customer Details" className={classes.customer}>
        <form onSubmit={handleSubmit}>
          <ErrorMessage message={error?.message} map={messages} />
          <InputGroup
            className={classes.textField}
            fields={fields}
            onKeyPress={(ev) => {
              if (ev.key === "Enter") {
                handleSubmit(ev);
                ev.preventDefault();
              }
            }} />
          <LoadButton
            variant="contained"
            padding={4}
            load={loading}
            disabled={!!loading}
            size="large"
            type="submit"
            color="secondary"
            className={classes.submitButton}>UPDATE</LoadButton>
        </form>
      </SideBox>
    </Fragment>
  );
};

export default UpdateDetails;