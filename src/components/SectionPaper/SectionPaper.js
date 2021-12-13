import React from "react";
import { Box, makeStyles, Paper, Typography } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
  },
  cardtitle: {
    marginBottom: 14,
    fontSize: 16,
  },
}));

const SectionPaper = (props) => {
  const { children, className, title, button } = props;

  const classes = useStyles();

  return (
    <Paper className={clsx(classes.paper, className)}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" className={classes.cardtitle}>{title}</Typography>
        {button}
      </Box>
      {children}
    </Paper>
  );
};

export default SectionPaper;