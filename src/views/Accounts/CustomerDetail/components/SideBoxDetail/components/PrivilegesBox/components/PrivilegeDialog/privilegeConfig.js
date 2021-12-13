import { Roles } from "utils/constants";

export const messages = {
  "unauthorized:no_privilege": "Sorry, you are not authorized to grant admin privileges to other users.",
  "model not found:account": "Sorry, we can't find this account. Please check to make sure this account exists",
};

export const roleScope = [
  Roles.SuperAdmin,
];