import { Button } from "@material-ui/core";
import Loader from "components/Loader";
import React from "react";

const LoadButton = (props) => {

  const { load, children, loadSize = 20, padding, ...rest } = props;

  return (
    <Button
      {...rest}
    >
      {!load && children}
      <Loader padding={padding} loading={load} thickness={4} size={loadSize} />
    </Button>
  );
};

export default LoadButton;