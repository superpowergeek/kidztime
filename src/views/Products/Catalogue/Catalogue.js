import { Listing, Page, SearchBar } from "components";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "store";
import useApi from "utils/api/useApi";
import { useAsyncTask } from "utils/tools";
import { buttonConfig, fields, pagesNav } from "./catalogueConfig";
import { CatalogueItem, CreateProduct, MultiSelect } from "./components";

let mounted = false;
const Catalogue = (props) => {

  const name = "products";

  const [openCreate, setOpenCreate] = useState(false);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [categories, setCategories] = useState([]);
  const api = useApi();

  const [runMultiList] = useAsyncTask(`${name}Multi`);

  useEffect(() => {
    mounted = true;
    runMultiList(async () => {
      const classificationList = await api.path(`classification/list`).get();
      const classificationResult = classificationList.data?.result?.models;
      const productList = classificationResult.filter(c => c.type === "product_type");
      const characterList = classificationResult.filter(c => c.type === "character");
      mounted && setProducts(productList);
      mounted && setCharacters(characterList);

      const categoryResult = await api.path(`classification/list`, {}, { type: "category" }).get();
      const categoryNameList = categoryResult.data?.result?.models;
      mounted && setCategories(categoryNameList);
    });
    return () => mounted = false;
  }, []); // eslint-disable-line

  const onCreate = () => {
    setOpenCreate(false);
    dispatch(Actions.Filter.reload({ key: name }));
  }

  const handleSearch = () => {
    dispatch(Actions.Filter.reload({ key: name }));
  };

  buttonConfig.create.onClick = () => setOpenCreate(true);

  return (
    <Page title="Product Catalogue" dashboard pagesNav={pagesNav}>
      <MultiSelect
        productTypes={products}
        characters={characters}
        categories={categories}
        handleSearch={(categoryIds) => handleSearch(categoryIds)}
      />
      <Listing
        name={name}
        path="product/list"
        fields={fields}
        dense
        pageRow
        hasCheck
        omitFalsyParams
        topElement={
          <SearchBar name={name} placeholder="Search Product" buttons={buttonConfig} />
        }
        itemComponent={CatalogueItem}
        errorMsg="Sorry, we cannot find any products. Please add some products or try searching again."
      />
      <CreateProduct
        open={openCreate}
        handleClose={() => onCreate()}
      />
    </Page>
  );
}

export default Catalogue;