import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(({ uppercase }) => ({
  root: {
    fontFamily: ["Roboto Mono", "monospace"],
    ...uppercase && { textTransform: "uppercase" },
  }
}));

const MonoText = props => {
  const { className, children, uppercase, component: Component, ...rest } = props;

  const classes = useStyles({ uppercase });
  return (
    <Component className={clsx(classes.root, className)} {...rest}>{children}</Component>
  );
};

MonoText.propTypes = {
  component: PropTypes.node,
  className: PropTypes.string,
  uppercase: PropTypes.bool,
};

MonoText.defaultProps = {
  component: "span"
};

export default MonoText;
