export const formStructure = {
  path: {
    initialValue: "",
    placeholder: "Path",
    type: "text",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
    },
  },
  title: {
    initialValue: "",
    placeholder: "Title",
    type: "text",
  },
  description: {
    initialValue: "",
    placeholder: "Description",
    type: "textarea",
  },
};

export const messages = {
  "unauthorised:authorisation required": "You need a valid token to carry out this action. Please sign out and sign in again.",
  "unauthorised:token expired": "Your token has expired. Please sign out and sign in again.",
};

export const successMsg = {
  "form success": "Customised page added!",
};