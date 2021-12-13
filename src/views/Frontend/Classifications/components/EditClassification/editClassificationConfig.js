import { GenderTypes } from "utils/constants";

export const formStructure = {
  character: {
    name: {
      initialValue: "",
      label: "Character Name",
      placeholder: "Character Name",
      type: "text",
      validate: {
        presence: { allowEmpty: false, message: "is required" },
      },
    },
    handle: {
      initialValue: "",
      label: "Handle",
      placeholder: "Handle",
      type: "text",
      validate: {
        presence: { allowEmpty: false, message: "is required" },
      },
    },
    gender: {
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
      label: "Category Name",
      placeholder: "Category Name",
      type: "text",
      validate: {
        presence: { allowEmpty: false, message: "is required" },
      },
    },
    handle: {
      initialValue: "",
      label: "Handle",
      placeholder: "Handle",
      type: "text",
      validate: {
        presence: { allowEmpty: false, message: "is required" },
      },
    },
  },
  product_type: {
    name: {
      initialValue: "",
      label: "Product Type Name",
      placeholder: "Product Type Name",
      type: "text",
      validate: {
        presence: { allowEmpty: false, message: "is required" },
      },
    },
    handle: {
      initialValue: "",
      label: "Handle",
      placeholder: "Handle",
      type: "text",
      validate: {
        presence: { allowEmpty: false, message: "is required" },
      },
    },
    min_age: {
      initialValue: "",
      label: "Min. Age",
      placeholder: "Min. Age",
      type: "text",
      validate: {
        presence: { allowEmpty: false, message: "is required" },
      },
    },
    max_age: {
      initialValue: "",
      label: "Max. Age",
      placeholder: "Max. Age",
      type: "text",
      validate: {
        presence: { allowEmpty: false, message: "is required" },
      },
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