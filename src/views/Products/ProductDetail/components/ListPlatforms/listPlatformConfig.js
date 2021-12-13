import React from "react";
import CodeIcon from "@material-ui/icons/Code";
import AllInboxIcon from '@material-ui/icons/AllInbox';
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
    title: "Lazmall",
    img: lazmall,
  },
  {
    title: "Qoo10",
    img: qoo10,
    imgStyle: {
      width: 48
    },
  },
  {
    title: "Shopee",
    img: shopee,
  }
];

export const InitialValues = [];

export const Exports = [
  {
    title: "XML",
    img: null,
    svg: <CodeIcon style={{fontSize: 32}} />
  },
  {
    title: "Bundle",
    img: null,
    svg: <AllInboxIcon style={{fontSize: 32}} />
  }
];