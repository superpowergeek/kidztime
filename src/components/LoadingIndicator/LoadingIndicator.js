import { Card, CardContent, CircularProgress, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import RenderGuard from "../RenderGuard";

const useStyle = makeStyles(theme => ({
  root: {
    textAlign: "center",
  },
}));

const LoadingIndicator = props => {
  const { active, variant, spinnerProps = {}, className = {}, ...rest } = props;
  const classes = useStyle();

  let content = null;
  if (variant === "card") {
    content = (
      <Card className={clsx(classes.root, className)} {...rest}>
        <CardContent>
          <CircularProgress color="primary" {...spinnerProps} />
        </CardContent>
      </Card>
    )
  } else {
    content = (
      <CircularProgress className={clsx(classes.root, className)} color="primary" {...rest} {...spinnerProps} />
    )
  }

  return (
    <RenderGuard renderIf={active}>{content}</RenderGuard>
  );
};

LoadingIndicator.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.any,
};

export default LoadingIndicator;