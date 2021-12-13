import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "store";
import {
  makeStyles,
  TableCell,
  Box,
  TextField,
  Typography,
} from "@material-ui/core";
import NumberFormat from "react-number-format";
const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: 0,
    display: "flex",
    alignItems: "center",
  },
  typography: {
    minWidth: "80px",
  },
  textfieldTrackingID: {
    width: "60%",
    margin: theme.spacing(1, 1),
    "& .MuiOutlinedInput-input": {
      padding: "16px 16px",
    },
    "& .MuiOutlinedInput-adornedEnd": {
      paddingRight: 0,
    },
  },
  textfieldWeight: {
    width: "20%",
    margin: theme.spacing(1, 1),
    "& .MuiOutlinedInput-input": {
      padding: "16px 16px",
    },
    "& .MuiOutlinedInput-adornedEnd": {
      paddingRight: 0,
    },
  },
}));
const ReadyToShip = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [dataForm, setDataForm] = useState({
    idTracking: "",
    weight: "",
  });
  const handleChangTextField = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDataForm((val) => {
      return {
        ...val,
        [name]: value,
      };
    });
  };
  useEffect(() => {
    dispatch(Actions.TrackingId.update(dataForm));
  }, [dataForm.weight, dataForm.idTracking]);
  useEffect(() => {
    return () => {
      dispatch(Actions.TrackingId.update(dataForm));
    };
  }, []);
  return (
    <React.Fragment>
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell colSpan={3}>
        <Box className={classes.root}>
          <Typography type="text" className={classes.typography} variant="h6">
            Tracking ID
          </Typography>
          <Typography>:</Typography>
          <TextField
            className={classes.textfieldTrackingID}
            value={dataForm.idTracking}
            name="idTracking"
            onChange={handleChangTextField}
          />
        </Box>
        <Box className={classes.root}>
          <Typography className={classes.typography} variant="h6">
            Weight
          </Typography>
          <Typography>:</Typography>
          <NumberFormat
            className={classes.textfieldWeight}
            value={dataForm.weight}
            customInput={TextField}
            name="weight"
            onChange={handleChangTextField}
            onFocus={(e) => {
              e.target.select();
            }}
            thousandSeparator={true}
          />
          <Typography>g</Typography>
        </Box>
      </TableCell>
    </React.Fragment>
  );
};

export default ReadyToShip;
