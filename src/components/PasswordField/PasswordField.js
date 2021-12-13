import { IconButton, InputAdornment, makeStyles, TextField } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";
import React, { useState } from "react";

const useStyles = makeStyles(theme => ({
  root: {}
}));

const PasswordField = (props) => {

  const { className, label, ...rest } = props;
  const [showStatus, setShowStatus] = useState(false);

  const classes = useStyles();

  const togglePassword = () => {
    setShowStatus(!showStatus)
  };

  const VisibilityButton = () => {
    return (
      <InputAdornment position="end">
        <IconButton
          tabIndex={-1}
          onClick={togglePassword}>
          {showStatus ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    );
  };

  return (
    <TextField
      {...rest}
      variant="outlined"
      label={label}
      type={showStatus ? "text" : "password"}
      className={clsx(className, classes.root)}
      InputProps={{ endAdornment: <VisibilityButton /> }} />
  );
}

export default PasswordField;