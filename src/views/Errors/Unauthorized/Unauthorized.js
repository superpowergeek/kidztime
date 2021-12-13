import React from "react";
import { makeStyles, useTheme, useMediaQuery, Button, Typography } from "@material-ui/core";
import { Page } from "components";
import src from "assets/images/unauthorized/unauthorized.png";
import { Actions } from "store";
import { ErrorStyles } from "utils/constants/styles";
import { useRouter } from "utils/tools";
import { useDispatch } from "react-redux";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  ...ErrorStyles,
  image: {
    maxWidth: "100%",
    width: 360,
    height: "auto"
  },
  normalPadding: {
    paddingTop: 24
  }
}));

const Unauthorized = (props) => {

  const classes = useStyles();
  const { logout } = props;
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const mobileDevice = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogout = async () => {
    router.history.push("/auth/login");
    dispatch(Actions.Session.logout());
  };

  return (
    <Page className={clsx({
      [classes.root]: true,
      [classes.normalPadding]: !logout
    })} title="Unauthorized" dashboard={false}>
      <Typography align="center" variant={mobileDevice ? "h4" : "h1"}>
        Unauthorized
      </Typography>
      <Typography align="center" variant="subtitle2">
        Sorry, it seems you are unauthorized to access this part of the application.
      </Typography>
      <div className={classes.imageContainer}>
        <img alt="Unauthorized" className={classes.image} src={src} />
      </div>
      {logout && <div className={classes.buttonContainer}>
        <Button color="primary" variant="outlined" onClick={handleLogout}>
          Sign Out
        </Button>
      </div>}
    </Page>
  );
};

export default Unauthorized;