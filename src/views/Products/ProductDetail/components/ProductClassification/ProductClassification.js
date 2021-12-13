import { Box, Chip, IconButton, makeStyles } from "@material-ui/core";
import MoreIcon from '@material-ui/icons/MoreVertTwoTone';
import { EmptyState, SectionPaper } from "components";
import React, { useState } from "react";
import { EditProductClassification } from "./components";

const useStyles = makeStyles(theme => ({
  chip: {
    margin: theme.spacing(2)
  }
}));

const ProductClassification = (props) => {
  const { model, setModel, className } = props;
  const classes = useStyles();
  const [edit, setEdit] = useState(false);

  return (
    <SectionPaper className={className}
      title="Product Classification"
      button={
        <IconButton onClick={() => setEdit(true)}>
          <MoreIcon />
        </IconButton>
      }
    >
      <Box display="flex" justifyContent="center">
        {model.categories?.map((category, index) => (
          <Chip
            key={index}
            label={category.name}
            color="primary"
            className={classes.chip}
          />
        ))}
        <EmptyState active={!model.categories || !model.categories.length} message={"No linked classifications"} />
      </Box>
      <EditProductClassification
        open={edit}
        handleClose={() => setEdit(false)}
        model={model}
        setModel={setModel}
      />
    </SectionPaper>
  );
};

export default ProductClassification;
