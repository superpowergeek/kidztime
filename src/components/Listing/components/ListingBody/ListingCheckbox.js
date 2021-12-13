import { Checkbox, makeStyles, TableCell } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(theme => ({
  checkboxCell: {
    width: 64
  }
}));

const ListingCheckbox = (props) => {

  const { onClick, checked } = props;
  const classes = useStyles();

  const handleClick = (ev) => {
    ev.stopPropagation();
    onClick();
  }

  return (
    <TableCell className={classes.checkboxCell}>
      <Checkbox checked={checked} onClick={handleClick} />
    </TableCell>
  );

};

export default ListingCheckbox;