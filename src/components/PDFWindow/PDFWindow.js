import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Document, PDFViewer, StyleSheet } from '@react-pdf/renderer';

const classes = StyleSheet.create({
  root: {
    width: "101%",
    height: "101%",
    position: "fixed",
    left: -2,
    top: -2,
  },
});

const PDFWindow = (props) => {
  const { children, title } = props;

  return (
    <Fragment>
      <Helmet>
        <title>{`${title} - Kidztime`}</title>
      </Helmet>
      <PDFViewer style={classes.root}>
        <Document>
          { children }
        </Document>
      </PDFViewer>
    </Fragment>
  );
};

PDFWindow.defaultProps = {
  title: "Page",
  wrap: false,
};

export default PDFWindow;