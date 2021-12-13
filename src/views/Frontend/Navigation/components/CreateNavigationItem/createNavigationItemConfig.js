export const formStructure = {
  ordering: {
    initialValue: "",
    placeholder: "Order",
    type: "number",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
      numericality: {
        greaterThan: 0
      }
    },
  },
  title: {
    initialValue: "",
    placeholder: "Title",
    type: "text",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
    },
  },
};

export const messages = {
  "unauthorised:authorisation required": "You need a valid token to carry out this action. Please sign out and sign in again.",
  "unauthorised:token expired": "Your token has expired. Please sign out and sign in again.",
};

export const successMsg = {
  "form success": "Navigation Item added!",
};