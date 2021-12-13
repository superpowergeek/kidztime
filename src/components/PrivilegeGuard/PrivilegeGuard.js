import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Paths, Roles } from "utils/constants";
import { checkPrivilege } from "utils/tools/privileges";
import Unauthorized from "views/Errors/Unauthorized";

/* To be revised later when Authentication API is added and roles are available */
const PrivilegeGuard = (props) => {

  const {
    children,
    include,           // included roles ( kidztime.superadmin , kidztime.genericadmin )
    type,
    logout
  } = props;

  const role = useSelector(state => state.Session.user?.privileges);

  // Redirect to Login if no role is specified
  if (!role) {
    return <Redirect to={Paths.Error.Unauthorized} logout={logout} />
  }

  // Checks if minimum role requirement is met by current user
  if (checkPrivilege(role, include) === false) {

    // If component is meant to be hidden
    if (type === "hidden") {
      return (
        <Fragment>
          {null}
        </Fragment>
      );

      // If user is meant to be redirected
    } else if (type === "redirect") {
      return <Redirect to={Paths.Error.Unauthorized} />
    } else {
      return (
        <Unauthorized />
      )
    }

  }

  // Else return the child component
  return children;
};

PrivilegeGuard.propTypes = {
  children: PropTypes.node,
  include: PropTypes.any,
  type: PropTypes.oneOf(["hidden", "redirect", "replace"]),
};

PrivilegeGuard.defaultProps = {
  include: [Roles.SuperAdmin, Roles.GenericAdmin],
  hidden: false,
};

export default PrivilegeGuard;