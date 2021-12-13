import React from "react";
import { makeStyles, TableCell, Typography, Box } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    paddingRight: 0,
  },
  button: {
    marginRight: theme.spacing(1),
    textTransform: "none",
    "&.MuiButton-outlined": {
      border: "2px solid #807777",
    },
  },
  image: {
    height: 80,
    width: 80,
  },
  content: {
    padding: theme.spacing(0, 2),
  },
  titleproduct: {
    color: "blue",
  },
}));
const ItemList = (props) => {
  const classes = useStyles();
  const item = props.item.product;
  return (
    <React.Fragment>
      <TableCell />
      <TableCell colSpan={3}>
        <Box className={classes.root}>
          <img
            className={classes.image}
            src={props.item.image}
            alt={props.item.name}
          />
          <Box className className={classes.content}>
            <Typography variant="h5" className={classes.titleproduct}>
              {item.sku}
            </Typography>
            <Typography>{item.name}</Typography>
            <Typography>x{props.item.quantity}</Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell />
      <TableCell />
      <TableCell />
    </React.Fragment>
  );
};

export default ItemList;
