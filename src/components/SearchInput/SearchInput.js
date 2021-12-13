import { InputAdornment, IconButton, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import React, { Fragment } from "react";

const SearchInput = (props) => {

  const { className, filter, placeholder, updateFilter } = props;

  return (
    <Fragment>
      <TextField
        variant="outlined"
        value={filter.search}
        type="text"
        placeholder={placeholder}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <IconButton
              color="inherit"
              onClick={() => updateFilter({ ...filter, search: "" })}>
              <CloseIcon />
            </IconButton>
          )
        }}
        className={className}
        onChange={(ev) => {
          updateFilter({ ...filter, search: ev.target.value, offset: 0});
        }}
      />
    </Fragment>
  );
}

SearchInput.defaultProps = {
  placeholder: "Search Keyword"
}

export default SearchInput;