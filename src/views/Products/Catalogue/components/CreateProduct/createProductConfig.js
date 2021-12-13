import { ProductStatus } from "utils/constants";

export const formStructure = {
  name: {
    initialValue: "",
    placeholder: "Product Name",
    type: "text",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
    },
  },
  alt_name: {
    initialValue: "",
    placeholder: "Product Alternative Name",
    type: "text",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
    },
  },
  handle: {
    initialValue: "",
    placeholder: "Product Handle",
    type: "text",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
    },
    disabled: true,
  },
  sku: {
    initialValue: "",
    placeholder: "SKU",
    type: "text",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
    },
    width: 4,
  },
  upc: {
    initialValue: "",
    placeholder: "UPC (Barcode)",
    type: "text",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
      numericality: {
        onlyInteger: true,
        greaterThanOrEqualTo: 0,
      },
    },
    width: 4,
  },
  stock: {
    initialValue: "",
    placeholder: "Stock",
    type: "number",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
      numericality: {
        onlyInteger: true,
        greaterThanOrEqualTo: 0,
      },
    },
    width: 4,
  },
  price: {
    initialValue: "",
    placeholder: "Price (SGD)",
    type: "number",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
      numericality: {
        greaterThanOrEqualTo: 0,
      },
    },
  },
  material: {
    initialValue: "",
    placeholder: "Material",
    type: "text",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
    },
    width: 6,
  },
  status: {
    initialValue: "",
    placeholder: "Status",
    label: "Status",
    type: "select",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
      inclusion: Object.values(ProductStatus),
    },
    width: 6,
    options: ProductStatus,
  },
  description: {
    initialValue: "",
    placeholder: "Description",
    type: "textarea",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
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