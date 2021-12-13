import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { fontStyles } from "utils/constants";
import { cashFormat } from "utils/formatting";

const styles = StyleSheet.create({
  ...fontStyles,
  largeCell: {
    width: "60%",
  },
  cellPad: {
    padding: "6px 8px",
  },
  smallCell: {
    width: "20%",
  },
  size: {
    fontSize: 11,
  },
  center: {
    textAlign: "center",
  }
});

const InvoiceSummaryRow = (props) => {
  const { borderStyle, model, style, value } = props;

  return (
    <View style={style}>
      <Text style={[styles.largeCell, styles.size, styles.cellPad]}>
        { value?.largeCell }
      </Text>
      <Text style={[styles.smallCell, styles.size, styles.cellPad, borderStyle]}>
        { value?.label }
      </Text>
      <Text style={[styles.smallCell, styles.size, styles.cellPad, styles.center, borderStyle]}>
        { cashFormat(model[value?.id]) }
      </Text>
    </View>
  );
};

export default InvoiceSummaryRow;