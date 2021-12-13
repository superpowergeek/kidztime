import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { fontStyles } from "utils/constants";
import { cashFormat, quantityFormat } from "utils/formatting";

const styles = StyleSheet.create({
  ...fontStyles,
  root: {
    flexDirection: "row",
    borderBottom: "1pt solid black",
  },
  largeCell: {
    width: "28%",
  },
  cellPad: {
    padding: "12px 8px",
  },
  smallCell: {
    width: "12%",
  },
  size: {
    fontSize: 11,
  },
  center: {
    textAlign: "center",
  },
  ultraSmall: {
    fontSize: 10,
  }
});

const InvoiceTableRow = (props) => {
  const { model } = props;

  return (
    <View style={[styles.regular, styles.root]}>
      <Text style={[styles.cellPad, styles.largeCell]}>
        <Text style={styles.size}>{model?.name ? `${model.name}\n` : " \n"}</Text>
        <Text style={styles.ultraSmall}>{model?.sku ? `SKU: ${model.sku}` : " "}</Text>
      </Text>
      <Text style={[styles.cellPad, styles.smallCell, styles.size, styles.center]}>
        {cashFormat(model?.unit_price)}
      </Text>
      <Text style={[styles.cellPad, styles.smallCell, styles.size, styles.center]}>
        {model?.specials ? model?.specials : "-"}
      </Text>
      <Text style={[styles.cellPad, styles.smallCell, styles.size, styles.center]}>
        {cashFormat(model?.discount)}
      </Text>
      <Text style={[styles.cellPad, styles.smallCell, styles.size, styles.center]}>
        {quantityFormat(model?.quantity)}
      </Text>
      <Text style={[styles.cellPad, styles.smallCell, styles.size, styles.center]}>
        {cashFormat(model?.subtotal)}
      </Text>
      <Text style={[styles.cellPad, styles.smallCell, styles.size, styles.center]}>
        {model?.refund ? quantityFormat(model?.refund?.quantity) : "-"}
      </Text>
    </View>
  );
};

export default InvoiceTableRow;