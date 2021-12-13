import kidztime from "assets/images/logo/blue-kidztime-logo.svg";
import qoo10 from "assets/images/logo/qoo10-logo.png";
import lazmall from "assets/images/logo/lazmall-logo.png";
import shopee from "assets/images/logo/shopee-logo.svg";

export const Platforms = [
  {
    title: "Kidztime",
    img: kidztime,
  },
  {
    title: "Qoo10",
    img: qoo10,
    imgStyle: {
      width: 48
    },
  },
  {
    title: "Lazmall",
    img: lazmall,
  },
  {
    title: "Shopee",
    img: shopee,
  }
];

export const pagesNav = {
  "Inventory": "",
};

export const fields = {
  image: {
    label: "",
    sortable: false,
  },
  name: {
    label: "Item Code",
    sortable: true,
  },
  price: {
    label: "Description",
    sortable: true,
  },
  sku: {
    label: "B2B Inv",
    sortable: true,
  },
  upc: {
    label: "Platform Inv",
    sortable: true,
  },
  stock: {
    label: "Inv Status",
    sortable: true,
  }
};