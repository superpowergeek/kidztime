import { Divider, Link, makeStyles, Typography } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import { AuthGuard, ErrorMessage, Loader, Page, RenderGuard, StatusChip } from "components";
import querystring from "querystring";
import React, { Fragment, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import useApi from "utils/api/useApi";
import { Paths } from "utils/constants";
import { AuthStyles } from "utils/constants/styles";
import { useAsyncTask, useRouter } from "utils/tools";
import { AuthContentBox } from "../components";
import PasswordResetForm from "./components/PasswordResetForm";
import { messages } from "./resetConfig";

const useStyles = makeStyles(theme => ({
  root: AuthStyles.root,
  chip: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  chipRoot: {
    color: theme.palette.success.main,
  },
  passwordForm: {
    marginTop: theme.spacing(3),
  },
  divider: AuthStyles.divider,
  errorMessage: {
    marginBottom: 10,
    marginTop: theme.spacing(4),
  },
  hidden: {
    display: "hidden",
  }
}));

const PasswordReset = props => {
  const api = useApi();
  const classes = useStyles();
  const router = useRouter();

  const [passwordRequest, setPasswordRequest] = useState(true);
  const [success, setSuccess] = useState(false);
  const [runResetToken, loading, error] = useAsyncTask("password-reset-token");

  useEffect(() => {
    let query = router.location.search || "";
    if (query.startsWith("?")) query = query.substring(1);
    const { token } = querystring.decode(query);

    runResetToken(async () => {
      setPasswordRequest(null);
      if (!token) throw Error("no token");
      const body = {
        "token": token,
      };
      const { data: { result } } = await api.path("password/query", null, body).get();
      setPasswordRequest({
        displayname: `${result.firstname} ${result.lastname}`,
        token: token,
      });
    })

    // eslint-disable-next-line
  }, [router.location.search]);

  const handlePasswordReset = () => {
    setSuccess(true);
  };

  return (
    <AuthGuard>
      <Page className={classes.root} title="Reset Password">
        <AuthContentBox width={480}>
          <Typography gutterBottom variant="h3">
            RESET PASSWORD
          </Typography>
          <RenderGuard renderIf={success}>
            <StatusChip
              icon={
                <CheckIcon className={classes.chipRoot} />
              }
              message="Password Request Success"
              className={classes.chip}
              status="success" />
            <Typography variant="body1">Your password has been updated, you may now proceed to login.</Typography>
          </RenderGuard>

          <ErrorMessage message={error?.message} map={messages} className={classes.errorMessage} />

          <Loader loading={loading} size={40} thickness={4} />

          <RenderGuard renderIf={["invalid token", "token expired", "no token"].includes(error?.message) || !passwordRequest}>
            <Link align="center" color="secondary" component={RouterLink} to={Paths.Auth.Password.Request} underline="always" variant="subtitle2">
              Request for password reset
            </Link>
          </RenderGuard>

          {passwordRequest && !success && (
            <Fragment>
              <Typography variant="subtitle2">Enter your new password. The password should be at least 8 characters long.</Typography>
              <Typography variant="subtitle2">
                Resetting password for <strong>{passwordRequest.displayname}</strong>.{" "}
                <Link align="center" color="secondary" underline="always" variant="subtitle2" component={RouterLink} to={Paths.Auth.Login}>
                  Not me
                  </Link>
              </Typography>
              <PasswordResetForm className={classes.passwordForm} token={passwordRequest.token} onPasswordReset={handlePasswordReset} />
            </Fragment>
          )}

          <Divider className={classes.divider} />
          <Link align="center" color="secondary" component={RouterLink} to={Paths.Auth.Login} underline="always" variant="subtitle2">
            Back to Login
          </Link>
        </AuthContentBox>
      </Page>
    </AuthGuard>
  );
};

PasswordReset.propTypes = {};

export default PasswordReset;
