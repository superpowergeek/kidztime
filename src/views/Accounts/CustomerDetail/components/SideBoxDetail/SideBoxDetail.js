import { Typography } from "@material-ui/core";
import { RenderGuard } from "components";
import React from "react";
import { OtherActions, PrivilegesBox, UpdateDetails } from "./components";

const SideBoxDetail = (props) => {

  const { user, loading, setUser } = props;

  return (
    <RenderGuard renderIf={!loading && user}>
      <Typography variant="h3">&nbsp;&nbsp;</Typography>
      <UpdateDetails user={user} setUser={setUser} />
      <PrivilegesBox user={user} setUser={setUser} />
      <OtherActions user={user} />
    </RenderGuard>
  );
};

export default SideBoxDetail;