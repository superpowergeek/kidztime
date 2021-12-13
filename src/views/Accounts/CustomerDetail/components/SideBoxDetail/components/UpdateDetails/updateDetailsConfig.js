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
  phone_number: {
    initialValue: "",
    placeholder: "Phone Number",
    type: "text",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
    },
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
  }
};

export const messages = {
  "unauthorised:authorisation required": "Invalid token. Please sign out and login again to refresh!",
  "firstname is required": "Please enter your first name."
};