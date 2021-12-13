import { makeStyles, TableCell, TableRow } from "@material-ui/core";
import React, { Fragment, useState } from "react";
import { pascalize } from "utils/formatting";
import { EditWebpageElement } from "./components";

const useStyles = makeStyles(theme => ({
  selectable: {
    cursor: "pointer",
  },
}));

const CustomisedPage = (props) => {
  const { model, reloadItem, ...rest } = props;
  const [edit, setEdit] = useState(false);

  const classes = useStyles();

  return (
    <Fragment>
      <TableRow
        hover
        className={classes.selectable}
        onClick={() => setEdit(true)} {...rest}
      >
        <TableCell>{pascalize(model.type)}</TableCell>
        <TableCell>{pascalize(model.position)}</TableCell>
        <TableCell>{model.link}</TableCell>
      </TableRow>
      <EditWebpageElement
        open={edit}
        handleClose={() => setEdit(false)}
        model={model}
      />
    </Fragment>
  )
}

export default CustomisedPage;