import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box } from "@material-ui/core";
import FileSaver from "file-saver";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "store";
import useApi from "utils/api/useApi";
import { useFilter } from "utils/filter";
import {
  FailResponse,
  SuccessResponse,
  WarningResponse,
} from "../WarningResponse";
import UpLoadFile from "../UpLoadFile";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(2),
  },
  button: {
    backgroundColor: "rgb(150, 187, 255)",
    color: "white",
    boxShadow:
      "0 1px 1px 0 rgb(0 0 0 / 14%), 0 2px 1px -1px rgb(0 0 0 / 12%), 0 1px 3px 0 rgb(0 0 0 / 20%)",
    padding: "10px 16px",
    marginLeft: theme.spacing(1),
    textTransform: "none",
    border: "none",
    "&:hover": {
      backgroundColor: "rgb(150, 187, 255)",
      color: "white",
      boxShadow:
        "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
    },
  },
}));
const ButtonMass = () => {
  const classes = useStyles();
  const api = useApi();
  const [filter, updateFilter] = useFilter("orders");
  const models = useSelector((state) => state.Models.models);
  const checkedList = useSelector((state) => state.Models.orders.checkedList);
  const dispatch = useDispatch();

  const handleClickMassDownLoad = useCallback(async () => {
    try {
      if (checkedList.length !== 0) {
        const body = {
          orders: checkedList,
        };
        const response = await api.path("order/order-process").post({ body });
        const byteCharacters = atob(response.data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        FileSaver.saveAs(blob, "kidztime.xlsx");
        updateFilter({ ...filter, success: true });
      }
    } catch (e) {
      console.log(e);
    }
  }, [checkedList]);

  const handleClickMassDispatch = useCallback(() => {
    dispatch(Actions.UpLoadFile.openFormUploadFile());
  }, [checkedList]);
  const handleClickMassComplete = useCallback(async () => {
    try {
      if (checkedList.length !== 0) {
        const body = {
          orders: checkedList,
        };
        const response = await api.path("order/order-complete").post({ body });
        if (response.status === 200) {
          let completed_orders = response.data.result.completed_orders;
          let invalid_orders = response.data.result.invalid_orders;
          if (completed_orders.length === checkedList.length) {
            updateFilter({ ...filter, success: true });
          } else {
            let listfail = models.filter((value) => {
              return invalid_orders.includes(value.id);
            });
            listfail = listfail.map((value) => {
              return value.reference;
            });
            let listcomplete = models.filter((value) => {
              return completed_orders.includes(value.id);
            });
            listcomplete = listcomplete.map((value) => {
              return value.reference;
            });
            updateFilter({ ...filter, warning: true });
            dispatch(
              Actions.ContentNotification.update({
                complete_order: `${listcomplete.join("; ")}`,
                fail_order: `: ${listfail.join("; ")}`,
                no_tracking_id: "",
              })
            );
          }
        }
      }
    } catch (e) {
      updateFilter({ ...filter, error: true });
    }
  }, [checkedList]);
  return (
    <Box className={classes.root}>
      <Button
        className={classes.button}
        variant="outlined"
        onClick={handleClickMassDownLoad}
      >
        Mass Download picking list
      </Button>
      <Button
        className={classes.button}
        variant="outlined"
        onClick={handleClickMassDispatch}
      >
        Mass Dispatch
      </Button>
      <Button
        className={classes.button}
        variant="outlined"
        onClick={handleClickMassComplete}
      >
        Mass Complete
      </Button>
      <SuccessResponse />
      <FailResponse />
      <WarningResponse />
      <UpLoadFile />
    </Box>
  );
};

export default ButtonMass;
