import React from "react";
import { Loader, RenderGuard } from "components";
import { makeStyles, Paper, Typography } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 150,
    maxWidth: "20%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: {
    padding: theme.spacing(2),
    "&:last-child": {
      padding: theme.spacing(2),
    },
  },
  title: {
    marginBottom: 4,
    fontWeight: "bold",
  },
  center: {
    textAlign: "center",
  }
}))

const TopBox = (props) => {
  const { box, cardClass } = props;
  const classes = useStyles();

  if (box) {
    return (
      <Paper className={clsx(classes.card, cardClass)} elevation={1} title={box?.title}>
        <RenderGuard renderIf={!box.loading}>
          <div className={classes.cardContent}>
            <Typography variant="h3" className={clsx(classes.title, classes.center)}>
              { box?.title }
            </Typography>
            <div className={classes.center}>{ box?.subtitle }</div>
          </div>
        </RenderGuard>
        <Loader loading={box.loading} size={40} thickness={4} />
      </Paper>
    );
  };
};

TopBox.defaultProps = {
  box: null,
  cardClass: "",
};

export default TopBox;