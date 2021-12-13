import { FormBlock, SectionPaper } from "components";
import { useSnackbar } from "notistack";
import React from "react";
import useApi from "utils/api/useApi";
import useFormHandler from "utils/forms/useFormHandler";
import { useAsyncTask } from "utils/tools";
import { formStructure, messages } from "./pageInfoConfig";

const PageInfo = (props) => {
  const { model, setModel } = props;
  const api = useApi();
  const [runUpdateInfo, loading, error] = useAsyncTask("product-update");
  const [fields, values, errors] = useFormHandler(formStructure, model);
  const { enqueueSnackbar } = useSnackbar();

  const handleUpdate = (ev) => {
    ev.preventDefault();

    runUpdateInfo(async () => {
      const { name, alt_name, handle, sku, upc, stock, material, status, description, } = values;
      const price = parseFloat(values.price);
      const body = {
        name, alt_name, handle, sku, upc, stock, material, status, description, price,
      };
      const response = await api.path("product/update", { product_id: model.id }).post({ body });
      if (response?.data?.result) {
        let product = response?.data?.result?.model;
        product.description = product?.product_info?.description;
        setModel(product);
        enqueueSnackbar("Product Successfully Updated!", { variant: "success" });
      }
    });
    return false;
  }

  return (
    <SectionPaper className="" title="Page Information">
      <FormBlock
        handleSubmit={handleUpdate}
        error={error}
        messages={messages}
        fields={fields}
        errors={errors}
        loading={loading}
        buttonTitle="Update Page"
      />
    </SectionPaper>
  );
};

export default PageInfo;
