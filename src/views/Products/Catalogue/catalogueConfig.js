import { ButtonStyles } from "utils/constants/styles";

export const pagesNav = {
  "Product Catalogue": "",
};

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
  },
  platforms: {
    label: "Listed Platforms",
    sortable: false,
  },
  exports: {
    label: "Exports",
    sortable: false,
  },
  promotions: {
    label: "Promotion Groups",
    sortable: false
  }
};

export const buttonConfig = {
  create: {
    style: ButtonStyles.ADD.style,
    title: "Create Product",
    icon: ButtonStyles.ADD.icon,
  },
};