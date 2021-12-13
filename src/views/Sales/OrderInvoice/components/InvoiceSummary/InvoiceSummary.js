import React, { Fragment } from "react";
import { StyleSheet } from "@react-pdf/renderer";
import { fieldVals } from "./invoiceSummaryConfig";
import InvoiceSummaryRow from "./InvoiceSummaryRow";
import { fontStyles } from "utils/constants";

const styles = StyleSheet.create({
  ...fontStyles,
  root: {
    flexDirection: "row",
    marginTop: 40,
  },
  rootAlt: {
    flexDirection: "row",
  },
  borderBlack: {
    borderBottom: "1pt solid black"
  },
  borderGrey: {
    borderBottom: "1pt solid #ededef",
  }
});

const returnClass = (index, vals) => {
  let classList = [styles.regular];
  if (index === 0) {
    classList.push(styles.root);
  } else {
    classList.push(styles.rootAlt);
  }
  return classList;
};

const returnBorderStyle = (index, vals) => {
  if (index >= vals.length - 2) {
    return styles.borderBlack;
  } else {
    return styles.borderGrey;
  }
};

const InvoiceSummary = (props) => {
  const { model } = props;
  const vals = Object.values(fieldVals);

  return (
    <Fragment>
      {
        vals.map((value, index) =>
          <InvoiceSummaryRow
            borderStyle={returnBorderStyle(index, vals)}
            style={returnClass(index, vals)}
            value={value}
            model={model}
            key={index}
          />
        )
      }
    </Fragment>
  );
};

export default InvoiceSummary;