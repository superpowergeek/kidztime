import React, { useEffect, useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal,
  Backdrop,
  Fade,
  Box,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector, useDispatch } from "react-redux";
import { useFilter } from "utils/filter";
import { Actions } from "store";
import useApi from "utils/api/useApi";

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
  button: {
    backgroundColor: "rgb(150, 187, 255)",
    color: "white",
    boxShadow:
      "0 1px 1px 0 rgb(0 0 0 / 14%), 0 2px 1px -1px rgb(0 0 0 / 12%), 0 1px 3px 0 rgb(0 0 0 / 20%)",
    padding: "10px 16px",
    textTransform: "none",
    border: "none",
    "&:hover": {
      backgroundColor: "rgb(150, 187, 255)",
      color: "white",
      boxShadow:
        "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
    },
  },
  closeIcon: {
    fill: "black",
  },
  IconButton: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  upFileButton: {
    margin: theme.spacing(2),
    backgroundColor: "rgb(199, 199, 199)",
    color: "black",
    boxShadow:
      "0 1px 1px 0 rgb(0 0 0 / 14%), 0 2px 1px -1px rgb(0 0 0 / 12%), 0 1px 3px 0 rgb(0 0 0 / 20%)",
    padding: "10px 16px",
    textTransform: "none",
    border: "none",
    borderRadius: "22px",
    "&:hover": {
      backgroundColor: "rgb(227 228 229)",
      color: "#554f4f",
      boxShadow:
        "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
      borderRadius: "22px",
    },
  },
  titleFile: {
    color: "black",
    margin: theme.spacing(1),
    marginTop: 0,
  },
}));
const UpLoadFile = () => {
  const classes = useStyles();
  const isOpen = useSelector((state) => state.UpLoadFile.isOpen);
  const models = useSelector((state) => state.Models.models);
  const [filter, updateFilter] = useFilter("orders");
  const dispatch = useDispatch();
  const [titleFile, setTitleFile] = useState("");
  const [fileSelect, setFileSelect] = useState(null);
  const api = useApi();

  const closeModel = useCallback(() => {
    dispatch(Actions.UpLoadFile.closeFormUploadFile());
  }, []);
  const handleFileInput = () => {
    window.addEventListener("change", (e) => {
      setFileSelect(e.target.files !== null ? e.target.files[0] : "");
      setTitleFile(e.target.files !== null ? e.target.files[0].name : "");
    });
  };
  const handleSubmit = useCallback(async () => {
    try {
      var formdata = new FormData();
      formdata.append("xlsx", fileSelect, titleFile);
      const response = await api
        .path("order/order-ship-dispatched")
        .postformdata({ body: formdata });
      dispatch(Actions.UpLoadFile.closeFormUploadFile());
      const incorrect_ids = response.data.result.incorrect_ids;
      const incorrect_tracking_ids =
        response.data.result.incorrect_tracking_ids;
      console.log(incorrect_ids + " " + incorrect_tracking_ids.length);
      if (response.data.result.process_result) {
        updateFilter({ ...filter, success: true });
      } else {
        updateFilter({ ...filter, warning: true });
        dispatch(
          Actions.ContentNotification.update({
            complete_order: "",
            fail_order: `orders_id : ${incorrect_ids.join(" ; ")}`,
            no_tracking_id: incorrect_tracking_ids.join(" ; "),
          })
        );
      }
    } catch (e) {
      dispatch(Actions.UpLoadFile.closeFormUploadFile());
      updateFilter({ ...filter, error: true });
      dispatch(
        Actions.ContentNotification.update({
          complete_order: "",
          fail_order: "Invalid file !",
          no_tracking_id: "",
        })
      );
    }
  });
  return (
    <Box>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={closeModel}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <Box className={classes.paper}>
            <Typography variant="h5">Upload CSV File</Typography>
            <Button
              variant="contained"
              component="label"
              className={classes.upFileButton}
            >
              Choose a file
              <input
                type="file"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                hidden
                onChange={handleFileInput}
              />
            </Button>
            <Typography className={classes.titleFile} variant="h6">
              {titleFile}
            </Typography>
            <Button className={classes.button} onClick={handleSubmit}>
              Upload
            </Button>
            <IconButton onClick={closeModel} className={classes.IconButton}>
              <CloseIcon className={classes.closeIcon} />
            </IconButton>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default UpLoadFile;
