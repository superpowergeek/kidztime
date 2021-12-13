import React from "react";
import { Chip, Grid, makeStyles, Typography, Box } from "@material-ui/core";
import moment from "moment";
import { OrderStatus } from "utils/constants";
import { ChipStyles } from "utils/constants/styles";
import capitalise from "utils/formatting/capitalise";
import { findMapKey } from "utils/tools";
import BtnGroup from "./BtnGroup";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#FFFFFF",
    boxShadow: " 0 0 0 1px rgb(63 63 68 / 5%), 0 1px 3px 0 rgb(63 63 68 / 15%)",
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(2),
  },
  marginTop16: {
    marginTop: theme.spacing(2),
  },
  marginTop12: {
    marginTop: theme.spacing(1.5),
  },
  buttonBox: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const OrderAction = (props) => {
  const { model, reload } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <Box className={classes.root}>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h5">Order Date</Typography>
            {model?.date && (
              <Typography className={classes.marginTop16}>
                {moment(model?.date).format("dddd, D MMMM YYYY, h:mm a")}
              </Typography>
            )}
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5">Order Status</Typography>
            {model?.status && (
              <Chip
                label={capitalise(model.status)}
                className={classes.marginTop12}
                classes={{ label: classes.chip }}
                style={ChipStyles[findMapKey(OrderStatus, model.status)]}
              />
            )}
          </Grid>
        </Grid>
        <Box className={classes.buttonBox}>
          <BtnGroup model={model} reload={reload} />
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default OrderAction;
