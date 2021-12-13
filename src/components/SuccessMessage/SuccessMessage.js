import { makeStyles, Typography, Card, CardContent } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import RenderGuard from "../RenderGuard";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  text: {
    color: theme.palette.success.main
  },
}));

const SuccessMessage = props => {
  const { message, map = {}, variant, textProps = {}, className, ...rest } = props;

  const classes = useStyles();

  const text = map[message] || message;
  let content = null;
  if (variant === "card") {
    content = (
      <Card {...rest}>
        <CardContent>
          <Typography variant="body2" className={clsx(classes.text, className)} {...textProps}>
            {text}
          </Typography>
        </CardContent>
      </Card>
    )
  } else {
    content = (
      <Typography variant="body2" className={clsx(classes.text, className)} {...rest} {...textProps}>
        {text}
      </Typography>
    )
  }

  return (
    <RenderGuard renderIf={message}>{content}</RenderGuard>
  );
};

SuccessMessage.propTypes = {
  message: PropTypes.string,
  map: PropTypes.object,
  className: PropTypes.any,
};

export default SuccessMessage;