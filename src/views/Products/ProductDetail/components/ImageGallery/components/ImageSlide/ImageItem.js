import React from "react";
import { makeStyles, Grid, Button, useMediaQuery } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
  },
  float: {
    margin: "0px auto",
    "&:hover": {
      backgroundColor: fade(theme.palette.error.light, 0.13),
    }
  },
  btnDiv: {
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    "& .MuiButton-label": {
      color: theme.palette.error.light,
    },
    "& .MuiSvgIcon-root": {
      color: theme.palette.error.light,
      marginRight: 6,
    }
  },
  img: {
    width: "100%",
    objectFit: "cover",
  }
}));

const ImageItem = (props) => {
  const { img, size, deleteFunc } = props;

  const classes = useStyles();

  const sizeCheck = useMediaQuery('(max-width:599px) and (min-width:360px)');

  return (
    <Grid item { ...size } className={classes.root}>
      <img src={img.uri} className={classes.img} alt="" />
      <div className={classes.btnDiv}>
        <Button size={sizeCheck ? "large" : "medium"} aria-label="remove" className={classes.float} onClick={deleteFunc}>
          <DeleteIcon />
          Delete
        </Button>
      </div>
    </Grid>
  );
};

export default ImageItem;