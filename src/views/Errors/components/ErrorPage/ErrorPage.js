import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { Typography, Button, useTheme, useMediaQuery } from "@material-ui/core";
import { Page } from "components";
import { ErrorStyles } from "utils/constants/styles";

const useStyles = makeStyles(theme => ({
  ...ErrorStyles,
  image: {
    maxWidth: "100%",
    width: 560,
    maxHeight: 300,
    height: "auto"
  },
}));

const ErrorPage = (props) => {

  const { title, header, src, redirect, btnTitle, subtitle } = props;

  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Page className={classes.root} title={title}>
      <Typography align="center" variant={mobileDevice ? "h4" : "h1"}>
        { header }
      </Typography>
      <Typography align="center" variant="subtitle2">
        { subtitle }
      </Typography>
      <div className={classes.imageContainer}>
        <img alt="Under development" className={classes.image} src={src} />
      </div>
      <div className={classes.buttonContainer}>
        <Button color="primary" component={RouterLink} to={redirect} variant="outlined">
          { btnTitle }
        </Button>
      </div>
    </Page>
  );

};

ErrorPage.defaultProps = {
  btnTitle: "Back to home",
  redirect: "/",
  subtitle: "You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation",
};

export default ErrorPage;