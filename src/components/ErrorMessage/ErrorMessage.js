import { Typography, Card, CardContent } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import RenderGuard from "../RenderGuard";

const ErrorMessage = props => {
  const { message, map = {}, variant, textProps = {}, ...rest } = props;

  const text = map[message] || message;
  let content = null;
  if (variant === "card") {
    content = (
      <Card {...rest}>
        <CardContent>
          <Typography variant="body2" color="error" {...textProps}>
            {text}
          </Typography>
        </CardContent>
      </Card>
    )
  } else {
    content = (
      <Typography variant="body2" color="error" {...rest} {...textProps}>
        {text}
      </Typography>
    )
  }

  return (
    <RenderGuard renderIf={message}>{content}</RenderGuard>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
  map: PropTypes.object,
  className: PropTypes.any,
};

export default ErrorMessage;