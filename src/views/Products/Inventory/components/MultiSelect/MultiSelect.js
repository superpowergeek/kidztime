import { Button, FormControl, Input, InputLabel, makeStyles, MenuItem, Select } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import NestedMenuItem from "material-ui-nested-menu-item";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "store";
import useApi from "utils/api/useApi";
import { useAsyncTask } from "utils/tools";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  fixedList: {
    width: "100%",
    height: 400,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
  subMenu: {
    marginLeft: 250,
  }
}));

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      marginTop: ITEM_HEIGHT,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MultiSelect = props => {
  const { characters = [], categories = [] } = props;
  const classes = useStyles();
  const [productType, setProductType] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const api = useApi();
  const [runProductTypeList] = useAsyncTask(`productTypeList`);
  const [categoryLists, setCategoryLists] = useState({});
  const dispatch = useDispatch();
  const filter = useSelector(state => state.Filter.products);

  const handleChange = (event, type) => {
    const value = event.target.value;
    if (type === "character") {
      const character = characters.find(c => c.id === value)
      setSelectedCharacter(character?.id || "");
    }
  };

  const onMouseOver = (id) => {
    if (!categoryLists[id]) {
      runProductTypeList(async () => {
        const productResult = await api.path(`classification/product_type/list`, {}, { ids: id }).get();
        const typeList = productResult.data?.result?.models;
        setCategoryLists({ ...categoryLists, [id]: typeList });
      });
    }
  }

  const onSearch = () => {
    const categories = [...productType ? [productType] : [], ...selectedCharacter ? [selectedCharacter] : []].join(",");
    dispatch(Actions.Filter.update({ key: "inventory", value: { ...filter, categories } }));
  };

  const handleClick = (event) => {
    if (event.currentTarget.value) {
      setProductType(event.currentTarget.value);
    } else {
      setProductType("");
    }
    setOpenMenu(false)
  };

  const flattenList = Object.values(categoryLists).reduce((acc, arr) => [...acc, ...arr], []);

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel id="mutiple-type-label">Product Type</InputLabel>
        <Select
          labelId="mutiple-type-label"
          id="mutiple-type"
          value={productType}
          onChange={(e, v) => handleChange(e, "productType")}
          input={<Input />}
          MenuProps={MenuProps}
          open={openMenu}
          onOpen={() => setOpenMenu(true)}
          onClose={() => setOpenMenu(false)}
          renderValue={e => e ? flattenList.find(c => c.child_id === e)?.child.name : "None"}
        >
          <MenuItem value="" onClick={handleClick}>
            None
          </MenuItem>

          {categories.map((c, index) => (
            <NestedMenuItem
              key={index}
              label={c.name}
              parentMenuOpen={true}
              onClick={handleClick}
              onMouseOver={() => onMouseOver(c.id)}
            >
              {categoryLists[c.id]?.map((c, index) => (
                <MenuItem key={index} value={c.child?.id} onClick={handleClick}>
                  {c.child?.name}
                </MenuItem>
              ))}
              {!categoryLists[c.id]?.length && (
                <MenuItem disabled onClick={handleClick}>
                  No Product Types
                </MenuItem>
              )}
            </NestedMenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="mutiple-char-label">Character</InputLabel>
        <Select
          labelId="mutiple-char-label"
          id="mutiple-char"
          value={selectedCharacter}
          onChange={(e, v) => handleChange(e, "character")}
          input={<Input />}
          MenuProps={MenuProps}
        >
          <MenuItem value="">
            None
          </MenuItem>
          {characters.map((char, index) => (
            <MenuItem key={index} value={char.id}>
              {char.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" color="secondary" onClick={onSearch}>
        <SearchIcon />Search
      </Button>
    </div>
  );
}

export default MultiSelect;
