import React, { useState } from "react";
import { makeStyles, Button, Chip } from "@material-ui/core";
import { PrivilegeGuard, SideBox } from "components";
import { PrivilegeDialog } from "./components";
import { Roles, RolesDisplay } from "utils/constants";
import clsx from "clsx";

const roleScope = [Roles.SuperAdmin];

const useStyles = makeStyles(theme => ({
  button: {
    backgroundColor: theme.palette.default.light,
    width: "100%",
  },
  bottom: {
    marginBottom: 14,
  },
  customer: {
    marginBottom: theme.spacing(4),
  },
  chips: {
    marginBottom: theme.spacing(2),
  },
  chipPad: {
    marginBottom: 4,
    marginRight: 4,
  }
}));

const PrivilegesBox = (props) => {

  const { user, setUser } = props;

  const classes = useStyles();

  const [priv, setPriv] = useState(false);

  return (
    <PrivilegeGuard include={roleScope} type="hidden">
      <SideBox title="Privileges" className={classes.customer}>
        <div className={clsx({ [classes.chips]: user?.privileges && user?.privileges.length > 0 })}>
          {
            user?.privileges.map((privilege, index) => {
              return (
                <Chip className={classes.chipPad} label={RolesDisplay[privilege.name]} key={index} />
              )
            })
          }
        </div>
        <Button variant="contained" className={clsx(classes.button, { [classes.bottom]: user?.privileges?.length > 0 })} size="large" onClick={() => setPriv(true)}>
          Edit Privileges
        </Button>
      </SideBox>
      <PrivilegeDialog open={priv} handleClose={() => setPriv(false)} user={user} setUser={setUser} />
    </PrivilegeGuard>
  );
};

export default PrivilegesBox;