import { PageElementType, PageElementPosition } from "utils/constants";

export const formStructure = {
  type: {
    initialValue: "",
    placeholder: "Type",
    label: "Type",
    type: "select",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
      inclusion: Object.values(PageElementType),
    },
    width: 6,
    options: PageElementType,
  },
  position: {
    initialValue: "",
    placeholder: "Position",
    label: "Position",
    type: "select",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
      inclusion: Object.values(PageElementPosition),
    },
    width: 6,
    options: PageElementPosition,
  },
  link: {
    initialValue: "",
    placeholder: "https://kidztime.com",
    label: "Link",
    type: "text",
    validate: {
      url: true
    },
  }
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