import { DiscountType, PromotionType } from "utils/constants";

export const formStructure = {
  name: {
    initialValue: "",
    label: "*Promotion Name",
    placeholder: "Promotion Name",
    type: "text",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
    }
  },
  type: {
    initialValue: "",
    placeholder: "Type",
    label: "*Type",
    type: "select",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
      inclusion: Object.values(PromotionType),
    },
    options: PromotionType,
  },
  discount_type: {
    initialValue: "",
    placeholder: "Discount Type",
    label: "*Discount Type",
    type: "select",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
      inclusion: Object.values(DiscountType),
    },
    options: DiscountType,
  },
  discount_value: {
    initialValue: 0,
    placeholder: "Discount Value",
    label: "*Discount Value",
    type: "number",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
    }
  },
  description: {
    initialValue: "",
    placeholder: "Description",
    label: "Description",
    type: "text",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
    }
  },
  start_at: {
    initialValue: new Date(),
    type: "date",
    label: "*Promotion Start Date",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
    }
  },
  end_at: {
    initialValue: new Date(),
    type: "date",
    label: "*Promotion End Date",
    validate: {
      presence: { allowEmpty: false, message: "is required" }
    }
  },
  published: {
    initialValue: false,
    type: "switch",
    label: "Status"
  }
};

export const messages = {
  "unauthorised:authorisation required": "You need a valid token to carry out this action. Please sign out and sign in again.",
  "unauthorised:token expired": "Your token has expired. Please sign out and sign in again.",
};

export const pagesNav = {
  "Promotion Settings": "/promotion-settings/list",
  "Promotion Page Details": ""
};

export const listingFields = {
  image: {
    label: ""
  },
  sku: {
    label: "Promotion Product",
    sortable: true,
  },
  alt_name: {
    label: "Product Name",
    sortable: true,
  },
  stock: {
    label: "Inventory",
    sortable: true
  },
  price: {
    label: "RRP",
    sortable: true
  },
  status: {
    label: "% Disc",
    sortable: true
  },
  delete: {
    label: "Promo",
    sortable: true
  }
};