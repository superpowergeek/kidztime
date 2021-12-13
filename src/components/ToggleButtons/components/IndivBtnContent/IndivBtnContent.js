import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  label: {
    fontSize: 11,
  },
  img: {
    width: 36,
    objectFit: "cover",
    display: "block",
    margin: "0px auto",
  }
}));

const IndivBtnContent = (props) => {
  const { btn } = props;
  const classes = useStyles();

  return (
    <Fragment>
      { btn.img &&  
        <img
          alt={btn.title || ""}
          src={btn.img}
          className={classes.img}
          style={btn.imgStyle || {}}
        />
      }
      { btn.svg || null }
      { btn.title &&
        <Fragment>
          <div className={classes.label}>{btn.title}</div>
        </Fragment>
      }
    </Fragment>
  );
};

export default IndivBtnContent;