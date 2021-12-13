export const messages = {
  "invalid credentials": "Your email or password is incorrect. Please try again.",
  "no account found": "It seems no account is found. Please try again or contact our support staff.",
  "unauthorized": "Sorry, you are not authorised to access this application."
};

export const formStructure = {
  email: {
    label: "Email",
    initialValue: "",
    type: "text",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
      email: { email: true, message: "is not valid" }
    },
  },
  password: {
    label: "Password",
    initialValue: "",
    type: "password",
    validate: {
      presence: { allowEmpty: false, message: "is required" }
    }
  }
};