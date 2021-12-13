import React from "react";
import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import Logo from "assets/images/logo/blue-kidztime-logo.png";
import { fontStyles } from "utils/constants";
import { nameFormat } from "utils/formatting";

const styles = StyleSheet.create({
  ...fontStyles,
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  img: {
    height: 40,
    objectFit: "contain",
  },
  size: {
    fontSize: 11,
  },
  text: {
    width: "30%",
  },
});

const InvoiceHeader = (props) => {
  const { model } = props;

  return (
    <View style={styles.root}>
      <Text style={styles.text}>
        <Text style={[styles.bold, styles.size]}>Bill From:{"\n"}</Text>
        <Text style={[styles.regular, styles.size]}>
          KIDZTIME!{"\n"}
          159 Sin Ming Road{"\n"}
          Amtech Building{"\n"}
          #03-01/07{"\n"}
          Singapore 575625{"\n"}
          Email: Enquiry@kidztime.com{"\n"}
          Tel: (65) 6553 3133
        </Text>
      </Text>
      <Image src={Logo} style={styles.img} />
      <Text style={styles.text}>
        <Text style={[styles.bold, styles.size]}>Remarks{"\n"}</Text>
        <Text style={[styles.regular, styles.size]}>
          {`Recipient: ${nameFormat(model?.account, true)}`}
          {`Contact: ${model?.account?.phone_number || "-"}`}
        </Text>
      </Text>
    </View>
  )
};

export default InvoiceHeader;