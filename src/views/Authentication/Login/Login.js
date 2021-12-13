import { Divider, Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LoginBanner from "assets/images/login-banner/backpack-push-toys-bg.png";
import { AuthGuard, Page } from "components";
import React from "react";
import { Paths } from "utils/constants";
import { AuthStyles } from "utils/constants/styles";
import { Link as RouterLink } from "react-router-dom";
import { LoginForm } from "./components";
import { AuthContentBox } from "../components";

const useStyles = makeStyles(theme => ({
  root: AuthStyles.root,
  media: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    color: theme.palette.white,
    display: "block",
    overflow: "hidden",
    position: "relative",
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  },
  loginForm: {
    marginTop: theme.spacing(3)
  },
  loginBanner: {
    position: "absolute",
    bottom: 0,
    right: -200,
    height: "100%"
  },
  divider: AuthStyles.divider
}));

const Login = () => {
  const classes = useStyles();

  return (
    <AuthGuard>
      <Page className={classes.root} title="Login">
        <AuthContentBox
          media={
            <div className={classes.media} title="PJ Masks bag">
              <img src={LoginBanner} alt="Girl carrying PJ Masks bag" className={classes.loginBanner} />
            </div>
          }
        >
          <Typography gutterBottom variant="h3">
            SIGN IN
            </Typography>
          <Typography variant="subtitle2">
            Log in to Kidztime CMS
            </Typography>
          <LoginForm className={classes.loginForm} />
          <Divider className={classes.divider} />
          <Link align="center" color="secondary" component={RouterLink} to={Paths.Auth.Password.Request} underline="always" variant="subtitle2" >
            Forgot your password?
            </Link>
        </AuthContentBox>
      </Page>
    </AuthGuard>
  );
};

export default Login;
