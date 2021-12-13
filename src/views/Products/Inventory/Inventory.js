import { Box, Button, makeStyles } from "@material-ui/core";
import { Listing, Page, SearchBar } from "components";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "store";
import useApi from "utils/api/useApi";
import { useFilter } from "utils/filter";
import { useAsyncTask } from "utils/tools";
import { InventoryItem, InventoryManagement, MultiSelect } from "./components";
import { fields } from "./inventoryConfig";

const useStyles = makeStyles(theme => ({
  platformGroup: {
    display: "flex",
    margin: theme.spacing(2, 0),
  },
  platformTitle: {
    width: 150,
    marginRight: theme.spacing(3)
  }
}));

let mounted = false;
const Inventory = () => {
  const name = "inventory";
  const classes = useStyles();
  const api = useApi();
  const [runInventory] = useAsyncTask("inventory");
  const [platforms, setPlatforms] = useState([]);
  const [activePlatform, setActivePlatform] = useState({});
  const [products, setProducts] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [categories, setCategories] = useState([]);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const [filter] = useFilter(name);

  const initPlatforms = () => {
    runInventory(async () => {
      const platformList = await api.path("inventory/platform/list").get();
      const items = platformList?.data?.result?.models;
      let active = items.find(platform => platform.name.toLowerCase() === "kidztime") || items[0];
      mounted && setActivePlatform(active);
      dispatch(Actions.Filter.update({ key: name, value: { ...filter, inventory: active.id } }));
      mounted && setPlatforms(items);

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
  };

  useEffect(() => {
    mounted = true;
    initPlatforms();
    return () => mounted = false;
  }, []); // eslint-disable-line

  const reloadItemFunc = (models, setModels) => (model) => {
    const index = models.findIndex(item => item.id === model.id);
    if (index >= 0) {
      const output = [...models];
      output[index] = model;
      setModels(output);
    }
  }

  const handleClick = (platform) => {
    setActivePlatform(platform);
    dispatch(Actions.Filter.update({ key: name, value: { ...filter, inventory: platform.id } }));
    dispatch(Actions.Filter.reload({ key: name }));
  }

  return (
    <Page title="Inventory" dashboard>
      Inventory
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" marginY={2} >
          {platforms.map(p => (
            <Button key={p.name} variant="contained" color={p.name === activePlatform.name ? "primary" : "default"} className={classes.platformTitle} onClick={() => handleClick(p)}>{p.name}</Button>
          ))}
        </Box>
        {/* <div>
          <IconButton className={classes.btn} onClick={() => setEdit(true)}>
            <MoreHorizIcon />
          </IconButton>
        </div> */}
      </Box>
      <MultiSelect
        productTypes={products}
        characters={characters}
        categories={categories}
      />
      {activePlatform.id && (
        <Listing
          name={name}
          path="product/list"
          fields={fields}
          dense
          pageRow
          hasCheck
          topElement={
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <SearchBar name={name} placeholder="Search Inventory" />
            </Box>
          }
          reloadItemFunc={reloadItemFunc}
          itemComponent={InventoryItem}
          errorMsg="Sorry, we cannot find any products. Please add some products or try searching again."
        />
      )}
      <InventoryManagement
        open={edit}
        handleClose={() => setEdit(false)}
      />
    </Page>
  );
}

export default Inventory;