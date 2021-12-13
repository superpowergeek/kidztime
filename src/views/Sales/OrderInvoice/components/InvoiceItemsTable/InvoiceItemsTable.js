import React, { Fragment } from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { fontStyles } from "utils/constants";
import { fields } from "./invoiceTableConfig";
import InvoiceTableRow from "./InvoiceTableRow";

const styles = StyleSheet.create({
  ...fontStyles,
  root: {
    flexDirection: "row",
    marginTop: 30,
  },
  header: {
    backgroundColor: "black",
    color: "white",
  },
  largeCell: {
    width: "28%",
  },
  cellPad: {
    padding: 8,
  },
  center: {
    textAlign: "center",
  },
  smallCell: {
    width: "12%",
  },
  size: {
    fontSize: 11,
  },
});

const returnClass = (field) => {
  let classes = [styles.cellPad, styles.size];
  if (field.size === "S") {
    classes.push(styles.smallCell);
  } else {
    classes.push(styles.largeCell);
  }
  if (field.align === "center") {
    classes.push(styles.center);
  }
  return classes;
}

const InvoiceItemsTable = (props) => {
  const { models } = props;
  const fieldLabels = Object.values(fields);

  return (
    <Fragment>
      <View style={[styles.root, styles.header, styles.regular]}>
        {
          fieldLabels.map((field, index) => {
            let classList = returnClass(field);
            return (
              <Text
                key={index}
                style={classList}
              >
                {field.label}
              </Text>
            );
          })
        }
      </View>
      {
        models.map((model, index) =>
          <InvoiceTableRow model={model} key={index} />
        )
      }
    </Fragment>
  );
};

export default InvoiceItemsTable;