import { makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import { SideBoxStyles } from "utils/constants/styles";

const useStyles = makeStyles(theme => ({
  root: {},
  sideBox: SideBoxStyles,
  titleBox: {
    backgroundColor: theme.palette.secondary.main,
    padding: 14,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
  },
  title: {
    color: theme.palette.primary.contrastText,
    textTransform: "uppercase",
  }
}));

const SideBox = (props) => {
  const { title, children, className } = props;

  const classes = useStyles();

  return (
    <Paper elevation={1} className={className}>
      <div className={classes.titleBox}>
        <Typography variant="h5" className={classes.title} align="center">{ title }</Typography>
      </div>
      <div className={classes.sideBox}>
        { children }
      </div>
    </Paper>
  );
};

export default SideBox;