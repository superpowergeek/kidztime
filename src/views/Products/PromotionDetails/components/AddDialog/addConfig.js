import { ButtonStyles } from "utils/constants";

export const fields = {
  image: {
    label: "",
    sortable: false,
  },
  name: {
    label: "Name",
    sortable: true,
  },
  price: {
    label: "Price (SGD)",
    sortable: true,
  },
  sku: {
    label: "SKU",
    sortable: true,
  },
  upc: {
    label: "UPC",
    sortable: true,
  },
  stock: {
    label: "Stock",
    sortable: true,
  }
};

export const buttonConfig = {
  add: {
    style: ButtonStyles.DELETE.style,
    title: "Add",
  }
};

export const messages = {
  "no id found": "Sorry, we can't find the id of this item. Please go back to the list and select this item again",
  "something_went_wrong": "Sorry, something went wrong. Please contact the support staff for further assistance",
};