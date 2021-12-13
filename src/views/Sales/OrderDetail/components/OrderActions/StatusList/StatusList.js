import React ,{useEffect} from "react";
import { formStructure, messages } from "./statusListConfig";
import { Box, makeStyles } from "@material-ui/core";
import { ErrorMessage, InputGroup } from "components";
import { useAsyncTask } from "utils/tools";
import useFormHandler from "utils/forms/useFormHandler";
import useApi from "utils/api/useApi";
const useStyles = makeStyles((theme) => ({
  inputs: {
    height: "100%",
    "& .MuiOutlinedInput-input": {
      padding: "10px 32px 10px 14px",
    },
  },
  marginTop20: {
    marginTop: 20,
  },
  mrleft8: {
    marginLeft: 8,
  },
  select: {
    display: "flex",
    alignItems: "center",
    "& .MuiSvgIcon-root": {
      marginRight: 6,
    },
  },
  error: {
    marginBottom: theme.spacing(2),
  },
  textField: {
    width: "100%",
  },
}));
const StatusList = (props) => {
  const classes = useStyles();
  const {model, reload} = props;
  const api = useApi();
  const [runStatusUpdate, load, error] = useAsyncTask("order-status");
  const [fields, values, errors, setValues] = useFormHandler(
    formStructure,
    model
  ); // eslint-disable-line
  const statusField = fields.find((field) => field.key === "status");

  statusField.onChange = (ev) => {
    runStatusUpdate(async () => {
      let body = { status: ev.target.value };
      await api.path("order/update", { order_id: model.id }).post({ body });
      reload();
    });
  };

  useEffect(() => {
    setValues(model);
  }, [model]); // eslint-disable-line
  return (
    <Box className={classes.inputs}>
      <ErrorMessage
        message={error?.message}
        map={messages}
        className={classes.error}
      />
      <InputGroup
        loading={load}
        fields={fields}
        className={classes.textField}
        selectProps={{
          classes: {
            select: classes.select,
          },
        }}
      />
    </Box>
  );
};

export default StatusList;
