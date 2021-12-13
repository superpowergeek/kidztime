import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Link } from "@material-ui/core";

const NGNRS_LINK = "https://www.ngnrs.io/";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    paddingBottom: theme.spacing(2),
    color: "rgba(0,0,0,.4)",
    textAlign: "center",
    lineHeight: 1,
  },
  text: {
    fontSize: 10,
    color: "black",
    opacity: .4,
    "&:hover": {
      opacity: .9,
    }
  },
}));
const NGNRSFooter = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <span>Made with ♥</span> <br />
      <Link className={classes.text} component="a" href={NGNRS_LINK} target="_blank">
        NGNRS Software Solutions
      </Link>
    </div>
  );
};

NGNRSFooter.propTypes = {
};

export default NGNRSFooter;