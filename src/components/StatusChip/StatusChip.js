import React, { Fragment } from "react";
import { makeStyles, Chip } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  success: {
    color: theme.palette.success.main,
    borderColor: theme.palette.success.main
  },
  warning: {
    color: theme.palette.warning.main,
    borderColor: theme.palette.warning.main
  },
  error: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main
  }
}));

const StatusChip = (props) => {
  const { message, className, status, icon } = props;

  const classes = useStyles();

  let activeClass;
  switch(status) {
    case "error":
      activeClass = classes.error;
      break;
    case "warning":
      activeClass = classes.warning;
      break;
    default:
      activeClass = classes.success;
      break;
  }

  return (
    <Fragment>
      <Chip
        icon={icon}
        label={message}
        variant="outlined"
        className={className}
        classes={{
          root: activeClass,
          outlined: activeClass
        }} />
    </Fragment>
  );
};

export default StatusChip;