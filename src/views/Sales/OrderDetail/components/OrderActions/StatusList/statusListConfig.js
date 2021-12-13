import React, { Fragment } from "react";
import { OrderStatus } from "utils/constants/constants";
import { TextStyles } from "utils/constants/styles";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import capitalise from "utils/formatting/capitalise";

const statusKeys = Object.keys(OrderStatus);
const statusVals = Object.values(OrderStatus);
let nodes = [];
statusKeys.forEach((each, index) => {
  nodes.push({
    value: OrderStatus[each],
    node: (
      <Fragment>
        <Brightness1Icon style={{...TextStyles[each], marginRight: 6,}} />
        {capitalise(OrderStatus[each])}
      </Fragment>
    ),
  });
});

export const formStructure = {
  status: {
    initialValue: "",
    placeholder: "Order Status",
    label: "Order Status",
    type: "select",
    validate: {
      presence: { allowEmpty: false, message: "is required" },
      inclusion: statusVals,
    },
    options: nodes,
  },
};

export const messages = {
  "unauthorised:authorisation required": "You need a valid token to carry out this action. Please sign out and sign in again.",
  "unauthorised:token expired": "Your session has expired. Please sign out and sign in to perform this function",
  "validation error": `Please select one of the following statuses: ${statusVals.join(", ")}`
};