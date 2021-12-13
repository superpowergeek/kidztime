
import { Roles } from "utils/constants";

export function checkPrivilege(roles, include = [Roles.SuperAdmin, Roles.GenericAdmin]) {
  if (roles && roles.length) {
    for (let jj = 0; jj < roles.length; jj++) {
      if (include.indexOf(roles[jj].name) > -1) {
        return true;
      }
    }
  }
  return false;
};

export function initPrivileges(items, user) {
  let values = {};
  let roles = user ? user.privileges : [];
  for (let ii = 0; ii < items.length; ii++) {
    values[items[ii].name] = {
      id: items[ii].id,
      checked: false,
    };
  }
  if (roles) {
    for (let jj = 0; jj < roles.length; jj++) {
      if (values.hasOwnProperty(roles[jj].name)) {
        values[roles[jj].name] = {
          ...values[roles[jj].name],
          checked: true,
        };
      }
    }
  }
  return values;
}