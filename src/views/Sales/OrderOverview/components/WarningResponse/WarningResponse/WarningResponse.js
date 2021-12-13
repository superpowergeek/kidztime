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
import CloseIcon from "@material-ui/icons/Close";
import WarningIcon from "@material-ui/icons/Warning";
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
    maxWidth: "400px",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    "&:focus": {
      outline: "none",
      color: "white",
    },
  },
  title: {
    margin: theme.spacing(1),
  },
  WarningIcon: {
    fill: "#ffe400",
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
  success: {
    color: "green",
  },
  fail: {
    color: "red",
  },
  no_tracking_id: {
    color: "#2272b7",
  },
}));

const WarningResponse = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const ContentNotification = useSelector((state) => state.ContentNotification);
  const warning = useSelector((state) => state.Filter.orders.warning);
  const [filter, updateFilter] = useFilter("orders");

  useEffect(() => {
    if (warning) {
      setOpen(true);
      updateFilter({ ...filter, warning: false });
    }
  }, [warning]);
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
              <WarningIcon className={classes.WarningIcon} />
            </Box>
            <Box>
              <Typography className={classes.title} variant="h4">
                Opps!
              </Typography>
            </Box>
            <Box>
              <Typography className={classes.success} variant="h6">
                {ContentNotification.complete_order === ""
                  ? ""
                  : `Updated : ${ContentNotification.complete_order}`}
              </Typography>
            </Box>
            <Box>
              <Typography className={classes.fail} variant="h6">
                {ContentNotification.fail_order === ""
                  ? ""
                  : `Can't updated ${ContentNotification.fail_order} `}
              </Typography>
            </Box>
            <Box>
              <Typography className={classes.no_tracking_id} variant="h6">
                {ContentNotification.no_tracking_id === ""
                  ? ""
                  : `Not found tracking_id : ${ContentNotification.no_tracking_id}`}
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

export default WarningResponse;
