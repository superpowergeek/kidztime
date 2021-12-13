import { CircularProgress, Grid } from "@material-ui/core";
import { RenderGuard } from "components";
import React from "react";

const Loader = (props) => {

  const { loading, size, thickness, padding = 16 } = props;

  return (
    <RenderGuard renderIf={loading}>
      <Grid container justify="center" style={{ padding }}>
        <CircularProgress size={size} thickness={thickness} />
      </Grid>
    </RenderGuard>
  );
};

export default Loader;