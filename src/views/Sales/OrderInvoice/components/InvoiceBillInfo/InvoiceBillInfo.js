import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { fontStyles } from "utils/constants";
import { nameFormat, postalCodeFormat } from "utils/formatting";
import moment from "moment";

const styles = StyleSheet.create({
  ...fontStyles,
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  size: {
    fontSize: 11,
  },
  text: {
    width: "50%",
  },
});

const InvoiceBillInfo = (props) => {
  const { model } = props;

  return (
    <View style={styles.root}>
      <Text style={styles.text}>
        <Text style={[styles.bold, styles.size]}>Bill To:{"\n"}</Text>
        <Text style={[styles.regular, styles.size]}>
          {nameFormat(model?.account, true)}  {/* Recipient Name */}
          {model?.account?.delivery_address ? `${model?.account?.delivery_address}\n` : ""}  {/* Recipient Delivery Address */}
          {`${postalCodeFormat(model)}\n` || ""}  {/* Recipient Postal Code */}
        </Text>
      </Text>
      <Text style={styles.text}>
        <Text style={[styles.bold, styles.size]}>
          {`\nOrder ${model?.reference}\n` || null}  {/* Recipient Order Reference */}
        </Text>
        <Text style={[styles.regular, styles.size]}>
          {`${moment(model?.date).format("DD MMM YYYY")}\n` || ""}  {/* Recipient Order Date */}
        </Text>
        <Text style={[styles.bold, styles.size]}>
          {model?.shipping ? `Shipping Type: ${model?.shipping}` : ""}  {/* Recipient Shipping */}
        </Text>
      </Text>
    </View>
  );
};

export default InvoiceBillInfo;