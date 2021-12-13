
export const messages = {
  "unauthorised:authorisation required": "You need a valid token to carry out this action. Please sign out and sign in again.",
  "unauthorised:token expired": "Your token has expired. Please sign out and sign in again.",
};

export const formStructure = {
  type: {
    initialValue: "",
    placeholder: "Product Type",
    label: "Product Type",
    type: "select",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
    },
    options: {},
  },
  category: {
    initialValue: "",
    placeholder: "Category",
    label: "Category",
    type: "select",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
    },
    options: {},
  },
};