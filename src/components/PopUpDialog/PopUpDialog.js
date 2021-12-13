import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
  },
  paperWidth: {
    maxWidth: "100%"
  },
  close: {
    position: "absolute",
    right: 0,
    padding: 20,
    [theme.breakpoints.only('xs')]: {
      top: 3,
    },
  },
  title: {},
}));

const PopUpDialog = (props) => {

  const { title, content, actions, open, handleClose, className, titleClass, contentClass, fullWidth, ...rest } = props;

  const classes = useStyles();

  return (
    <Dialog open={open} onClose={handleClose} className={clsx(classes.root, className)} {...rest}
      classes={{
        paperWidthSm: fullWidth && classes.paperWidth 
      }}
    >
      {
        handleClose && (
          <IconButton aria-label={"Close " + title} className={classes.close} onClick={handleClose}>
            <CloseIcon />
          </IconButton>)
      }
      {
        title && (
          <DialogTitle className={clsx(classes.title, titleClass)}>
            {title}
          </DialogTitle>)
      }
      {
        content && (
          <DialogContent className={contentClass}>{content}</DialogContent>)
      }
      {
        actions && (
          <DialogActions>{actions}</DialogActions>
        )
      }
    </Dialog>
  );
};

PopUpDialog.propTypes = {
  title: PropTypes.any,
  content: PropTypes.any,
  actions: PropTypes.any,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  fullWidth: PropTypes.bool,
};

PopUpDialog.defaultProps = {
  title: null,
  content: null,
  actions: null,
  open: false,
  handleClose: null,
  className: "",
  fullWidth: false,
};

export default PopUpDialog;