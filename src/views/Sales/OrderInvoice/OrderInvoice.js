import React, { Fragment, useEffect, useState } from "react";
import { PDFWindow } from "components";
import { InvoiceBillInfo, InvoiceHeader, InvoiceItemsTable, InvoiceSummary } from "./components";
import { Redirect } from "react-router-dom";
import { formLoad, Paths } from "utils/constants";
import { Font, Page, StyleSheet } from '@react-pdf/renderer';
import useApi from "utils/api/useApi";
import useAsyncTask from "utils/tools/useAsyncTask";
import { useRouter } from "utils/tools";

Font.register({
  family: "Roboto",
  fonts: formLoad,
});

const styles = StyleSheet.create({
  page: {
    padding: 50,
  },
  containerOne: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  viewAlt: {
    display: "flex",
    justifyContent: "space-between",
  },
  root: {
    padding: 20,
    '@media max-width: 400': {
      flexDirection: 'column',
    },
    '@media min-width: 400': {
      flexDirection: 'row',
    },
  },
  text: {
    height: 100,
    width: 150,
    backgroundColor: 'red',
  },
});

const modelParse = (model) => {
  if (model) {
    model.description = model?.product_info?.description || "";
    return model;
  } else return null;
};

const OrderInvoice = (props) => {
  const api = useApi();
  const router = useRouter();

  const [orderItems, setOrderItems] = useState([]);
  const [model, setModel] = useState(null);
  const [runDetail, loading, error] = useAsyncTask(`invoice-detail`);
  let body = {};

  useEffect(() => {
    let id = router?.match?.params["order_id"];
    if (!id) return;
    body["order_id"] = id;

    runDetail(async () => {
      const response = await api.path("order/detail", body).get();
      const model = modelParse(response?.data?.result?.model);
      setModel(model);
      if (model?.id) {
        const results = await api.path("order/item/list", body).get();
          let items = results?.data?.result?.models ;
          setOrderItems(items);
      }
    });
  }, [router.match.params]); // eslint-disable-line

  return (
    <Fragment>
      {!loading && !error && model &&
        <PDFWindow title="Invoice">
          <Page size="A4" wrap={true} style={styles.page}>
            <InvoiceHeader model={model} />
            <InvoiceBillInfo model={model} />
            <InvoiceItemsTable models={orderItems} />
            <InvoiceSummary model={model} />
          </Page>
        </PDFWindow>
      }

      {error &&
        <Redirect to={Paths.Api.NoInvoiceFound} />
      }
    </Fragment>
  );
};

export default OrderInvoice;