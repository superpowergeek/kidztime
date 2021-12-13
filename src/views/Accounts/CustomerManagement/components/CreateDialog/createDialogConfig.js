export const formStructure = {
  firstname: {
    initialValue: "",
    placeholder: "First Name",
    type: "text",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
    },
  },
  lastname: {
    initialValue: "",
    placeholder: "Last Name",
    type: "text",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
    },
  },
  delivery_address: {
    initialValue: "",
    placeholder: "Delivery Address",
    type: "text",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
    },
  },
  postal_code: {
    initialValue: "",
    placeholder: "Postal Code",
    type: "text",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
    },
    width: 6,
  },
  phone_number: {
    initialValue: "",
    placeholder: "Phone Number",
    type: "text",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
    },
    width: 6,
  },
  email_address: {
    initialValue: "",
    placeholder: "Email Address",
    type: "text",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
      email: { email: true, message: "is not valid" },
    },
  },
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

export const messages = {
  "unauthorised:authorisation required": "You need a valid token to carry out this action. Please sign out and sign in again.",
  "unauthorised:token expired": "Your token has expired. Please sign out and sign in again.",
  "access_handle conflict": "It seems an account with this email exists. Please enter another email."
};

export function resetForm(form) {
  let keys = Object.keys(form);
  for (let ii = 0; ii < keys.length; ii++) {
    form[keys[ii]] = "";
  }
  return form;
};