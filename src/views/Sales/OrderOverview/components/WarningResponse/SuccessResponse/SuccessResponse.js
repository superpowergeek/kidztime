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
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
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
  checkCircleIcon: {
    fill: "#37d537d6",
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
}));

const SuccessResponse = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const success = useSelector((state) => state.Filter.orders.success);
  const [filter, updateFilter] = useFilter("orders");
  useEffect(() => {
    if (success) {
      setOpen(true);
      updateFilter({ ...filter, success: false });
    }
  }, [success]);
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
              <CheckCircleIcon className={classes.checkCircleIcon} />
            </Box>
            <Box id="modal-description">
              <Typography variant="h4">Update successful !</Typography>
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

export default SuccessResponse;
