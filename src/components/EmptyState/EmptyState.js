import { makeStyles, Typography } from "@material-ui/core";
import NotFound from "assets/images/not-found/not-found.png";
import RenderGuard from "components/RenderGuard";
import PropTypes from "prop-types";
import React from "react";

const useStyle = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 0),
    maxWidth: 400,
    margin: "0px auto",
  },
  img: {
    width: 200,
    display: "block",
    margin: "0px auto",
  },
  message: {
    margin: 12,
  }
}));

const EmptyState = props => {
  const { active, message, ...rest } = props;
  const classes = useStyle();
  return (
    <RenderGuard renderIf={active} {...rest}>
      <div className={classes.root}>
        <img src={NotFound} className={classes.img} alt="Not Found" />
        <Typography align="center" className={classes.message}>{message}</Typography>
      </div>
    </RenderGuard>
  );
};

EmptyState.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.any,
};

export default EmptyState;