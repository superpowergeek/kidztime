import { PageElementType, PageElementPosition, PageElementHideBottomDivider,  PageElementDisableGutters, PageElementMaxWidth} from "utils/constants";

export const formStructure = {
  type: {
    initialValue: "",
    placeholder: "Type",
    label: "Type",
    type: "select",
    disabled: true,
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
    disabled: true,
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
    disabled: true,
    type: "text",
    validate: {
      url: true
    },
  },
  hide_bottom_divider: {
    initialValue: "false",
    placeholder: "Hide Bottom Divider",
    label: "Hide Bottom Divider",
    type: "select",
    options: PageElementHideBottomDivider,
    disabled: true
  },
  max_width: {
    initialValue: "lg",
    placeholder: "Max Width",
    label: "Max Width",
    type: "select",
    options: PageElementMaxWidth,
    disabled: true
  },
  disable_gutters: {
    initialValue: "false",
    placeholder: "Disable Gutters",
    label: "Disable Gutters",
    type: "select",
    options: PageElementDisableGutters,
    disabled: true
  }
};

export const messages = {
  "unauthorised:authorisation required": "You need a valid token to carry out this action. Please sign out and sign in again.",
  "unauthorised:token expired": "Your token has expired. Please sign out and sign in again.",
  "file not image": "Oops, it seems your file is not an image. Please submit an image."
};

export const successMsg = {
};