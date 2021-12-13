import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal,
  Backdrop,
  Fade,
  Box,
  Typography,
  IconButton,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector } from "react-redux";
import { useFilter } from "utils/filter";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    minWidth: "260px",
    minHeight: "190px",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    "&:focus": {
      outline: "none",
      color: "white",
    },
  },
  cancelIcon: {
    fill: "red",
    margin: theme.spacing(1),
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  closeIcon: {
    fill: "black",
  },
  IconButton: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  title: {
    margin: theme.spacing(1),
  },
}));

const FailResponse = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const ContentNotification = useSelector((state) => state.ContentNotification);
  const error = useSelector((state) => state.Filter.orders.error);
  const [filter, updateFilter] = useFilter("orders");

  useEffect(() => {
    if (error) {
      setOpen(true);
      updateFilter({ ...filter, error: false });
    }
  }, [error]);
  const closeModel = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className={classes.modal}
        open={open}
        onClose={closeModel}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box className={classes.paper}>
            <Box id="modal-title">
              <CancelIcon className={classes.cancelIcon} />
            </Box>
            <Box id="modal-description">
              <Typography className={classes.title} variant="h4">
                Error
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6">
                {ContentNotification.fail_order === ""
                  ? ""
                  : ContentNotification.fail_order}
              </Typography>
            </Box>
            <IconButton onClick={closeModel} className={classes.IconButton}>
              <CloseIcon className={classes.closeIcon} />
            </IconButton>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default FailResponse;
