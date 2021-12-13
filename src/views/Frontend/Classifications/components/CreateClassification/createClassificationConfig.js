import { GenderTypes } from "utils/constants";

export const formStructure = {
  character: {
    name: {
      initialValue: "",
      placeholder: "Character Name",
      type: "text",
      validate: {
        presence: { allowEmpty: false, message: "is required" },
      },
    },
    handle: {
      initialValue: "",
      placeholder: "Handle",
      disabled: true,
      type: "text",
      validate: {
        presence: { allowEmpty: false, message: "is required" },
      },
    },
    gender: {
      initialValue: Object.values(GenderTypes)[0],
      placeholder: "Gender",
      label: "Gender",
      type: "select",
      validate: {
        presence: { allowEmpty: false, message: "is required" },
        inclusion: Object.values(GenderTypes),
      },
      options: GenderTypes,
    },
  },
  category: {
    name: {
      initialValue: "",
      placeholder: "Category Name",
      type: "text",
      validate: {
        presence: { allowEmpty: false, message: "is required" },
      },
    },
    handle: {
      initialValue: "",
      placeholder: "Handle",
      disabled: true,
      type: "text",
      validate: {
        presence: { allowEmpty: false, message: "is required" },
      },
    },
  },
  product_type: {
    name: {
      initialValue: "",
      placeholder: "Product Type Name",
      type: "text",
      validate: {
        presence: { allowEmpty: false, message: "is required" },
      },
    },
    handle: {
      initialValue: "",
      placeholder: "Handle",
      disabled: true,
      type: "text",
      validate: {
        presence: { allowEmpty: false, message: "is required" },
      },
    },
    min_age: {
      initialValue: "",
      placeholder: "Min. Age",
      type: "text",
      validate: {
        presence: { allowEmpty: false, message: "is required" },
      },
      width: 6,
    },
    max_age: {
      initialValue: "",
      placeholder: "Max. Age",
      type: "text",
      validate: {
        presence: { allowEmpty: false, message: "is required" },
      },
      width: 6,
    },
  },
};

export const messages = {
  "unauthorised:authorisation required": "You need a valid token to carry out this action. Please sign out and sign in again.",
  "unauthorised:token expired": "Your token has expired. Please sign out and sign in again.",
  "product already created with name": "Sorry, this title belongs to another product. Please enter another title.",
  "product with handle already exists": "Sorry, this handle belongs to another product. Please enter another handle.",
  "file not image": "Oops, it seems your file is not an image. Please submit an image."
};

export const successMsg = {
  "form success": "Product details submitted!",
};