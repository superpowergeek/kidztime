export const formStructure = {
  email: {
    label: "Email",
    initialValue: "",
    placeholder: "Email",
    type: "text",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
      email: { email: true, message: "is not valid" },
    }
  }
};

export const messages = {};