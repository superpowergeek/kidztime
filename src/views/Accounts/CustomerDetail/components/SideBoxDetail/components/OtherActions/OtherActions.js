import { Button, makeStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import clsx from "clsx";
import { DeleteDialog, ErrorMessage, LoadButton, SideBox } from "components";
import React, { Fragment, useState } from "react";
import useApi from "utils/api/useApi";
import { ButtonStyles } from "utils/constants/styles";
import { useAsyncTask } from "utils/tools";

const useStyles = makeStyles(theme => ({
  button: {
    backgroundColor: theme.palette.default.light,
    width: "100%",
  },
  bottom: {
    marginBottom: 14,
  },
  buttonRed: ButtonStyles.DELETE.style,
  fullWidth: {
    width: "100%",
  }
}));

const OtherActions = (props) => {
  const { user } = props;
  const api = useApi();
  const classes = useStyles();
  const [remove, setRemove] = useState(false);
  const [runResetPassword, loading, error] = useAsyncTask("send-password-reset");

  const updatePassword = () => {
    if (user.email_address && user.id) {
      const body = {
        "username": user.email_address,
        "cms": "true",
      };
      runResetPassword(async () => {
        const response = await api.path("password/request").post({ body });
        if (response?.data?.result) {
          // setType("success_send");
        }
      });
    }
  };

  const del = () => {
    return api.path("account/delete", { account_id: user.id }).del();
  }

  return (
    <Fragment>
      <SideBox title="Other Actions">
        <ErrorMessage message={error?.message} />
        {/* <Button variant="contained" className={classes.button} size="large">
          Sync Voucherify
        </Button> */}
        <LoadButton load={loading} variant="contained" className={clsx(classes.button, classes.bottom)} size="large" onClick={() => updatePassword()}>
          Send password reset email
        </LoadButton>
        <Button variant="contained" className={clsx(classes.buttonRed, classes.fullWidth)} size="large" startIcon={<DeleteIcon />} onClick={() => setRemove(true)}>
          Delete Account
        </Button>
      </SideBox>
      <DeleteDialog
        open={remove}
        handleClose={() => setRemove(false)}
        redirect="/customers"
        del={del}
      />
    </Fragment>
  );
};

export default OtherActions;