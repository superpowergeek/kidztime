export const messages = {
  "invalid password": "Your new password is invalid.",
  "invalid token": "Your password reset token is invalid. Please request for a password reset again.",
  "token expired": "Your password reset request has expired. Please submit a new request.",
};

export const formStructure = {
  new_password: {
    initialValue: "",
    placeholder: "New Password",
    type: "password",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
      length: { 
        minimum: 8,
        tooShort: "needs to be at least 8 characters long."
      }
    }
  },
  confirm_password: {
    initialValue: "",
    placeholder: "Confirm Password",
    type: "password",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
      equality: "new_password"
    }
  },
};