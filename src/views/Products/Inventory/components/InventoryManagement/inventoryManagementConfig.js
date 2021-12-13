export const formStructure = {
  name: {
    initialValue: "",
    placeholder: "Name",
    type: "text",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
    },
  },
  description: {
    initialValue: "",
    placeholder: "Description",
    type: "text",
    validate: {
      presence: { allowEmpty: true, message: "is required" },
    },
  },
};