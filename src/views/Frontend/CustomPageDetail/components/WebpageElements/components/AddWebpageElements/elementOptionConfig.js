import { PageElementMaxWidth, PageElementHideBottomDivider, PageElementDisableGutters } from "utils/constants";

export const productFeatureFormStructure = {
  description: {
    initialValue: "",
    placeholder: "Description",
    label: "Description",
    type: "text"
  }, 
  count: {
    initialValue: 10,
    placeholder: 10,
    label: "Count",
    type: "number"
  }
};

export const categoryFeatureFormStructure = {
  title: {
    initialValue: "",
    placeholder: "Title",
    label: "Title",
    type: "text"
  },
  description: {
    initialValue: "",
    placeholder: "Description",
    label: "Description",
    type: "text"
  }
}

export const productListingFormStructure = {
  count: {
    initialValue: 10,
    placeholder: 10,
    label: "Count",
    type: "number",
  }
}

export const otherSettingsFormStructure = {
  hide_bottom_divider: {
    initialValue: "false",
    placeholder: "Hide Bottom Divider",
    label: "Hide Bottom Divider",
    type: "select",
    options: PageElementHideBottomDivider,
  },
  max_width: {
    initialValue: "lg",
    placeholder: "Max Width",
    label: "Max Width",
    type: "select",
    options: PageElementMaxWidth,
  },
  disable_gutters: {
    initialValue: "false",
    placeholder: "Disable Gutters",
    label: "Disable Gutters",
    type: "select",
    options: PageElementDisableGutters,
  }
};