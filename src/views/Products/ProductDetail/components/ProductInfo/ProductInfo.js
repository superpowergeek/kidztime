import { FormBlock, SectionPaper } from "components";
import { useSnackbar } from "notistack";
import React from "react";
import useApi from "utils/api/useApi";
import { getHandle } from "utils/forms";
import useFormHandler from "utils/forms/useFormHandler";
import { useAsyncTask } from "utils/tools";
import { formStructure, messages } from "./productInfoConfig";

const ProductInfo = (props) => {
  const { model, setModel } = props;
  const api = useApi();
  const [runUpdateInfo, loading, error] = useAsyncTask("product-update");
  const [fields, values, errors, setValues] = useFormHandler(formStructure, model);
  const nameField = fields.find(field => field.key === "name");
  const { enqueueSnackbar } = useSnackbar();

  nameField.onChange = (ev) => {
    setValues({
      ...values,
      name: ev.target.value,
      handle: getHandle(ev.target.value),
    });
  };

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
    <SectionPaper className="" title="Product Information">
      <FormBlock
        handleSubmit={handleUpdate}
        error={error}
        messages={messages}
        fields={fields}
        errors={errors}
        loading={loading}
        buttonTitle="Update Product"
      />
    </SectionPaper>
  );
};

export default ProductInfo;
