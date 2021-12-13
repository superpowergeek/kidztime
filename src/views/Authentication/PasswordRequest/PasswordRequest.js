import { Divider, Link, makeStyles, Typography } from "@material-ui/core";
import { Page, AuthGuard } from "components";
import { Link as RouterLink } from "react-router-dom";
import { AuthContentBox } from "../components";
import PasswordRequestForm from "./components/PasswordRequestForm";
import React from "react";
import { Paths } from "utils/constants";
import { AuthStyles } from "utils/constants/styles";

const useStyles = makeStyles(theme => ({
  root: AuthStyles.root,
  passwordForm: {
    marginTop: theme.spacing(3),
  },
  divider: AuthStyles.divider
}));

const PasswordRequest = props => {
  const classes = useStyles();

  return (
    <AuthGuard>
      <Page className={classes.root} title="Request Password">
        <AuthContentBox width={480}>
          <Typography gutterBottom variant="h3">
            REQUEST PASSWORD RESET
          </Typography>
          <Typography variant="subtitle2">
            Request for a change in your account password
          </Typography>
          <PasswordRequestForm className={classes.passwordForm} />
          <Divider className={classes.divider} />
          <Link align="center" color="secondary" component={RouterLink} to={Paths.Auth.Login} underline="always" variant="subtitle2" >
            Back to Login
          </Link>
        </AuthContentBox>
      </Page>
    </AuthGuard>
  );
};

PasswordRequest.propTypes = {
};

export default PasswordRequest;