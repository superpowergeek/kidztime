import React, { Fragment , useState  , useRef } from "react";
import { makeStyles, TextField, InputAdornment, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { useFilter } from "utils/filter";

const useStyles = makeStyles(theme => ({
  textfield: {
    width: "40ch",
    "& .MuiOutlinedInput-input": {
      padding: "16px 14px",
    },
    "& .MuiOutlinedInput-adornedEnd": {
      paddingRight: 0,
    },
    [theme.breakpoints.only("xs")]: {
      width: "100%",
    },
  },
}));

const Search = props => {
  const { name, placeholder } = props;

  const classes = useStyles();

  const [filter, updateFilter] = useFilter(name);

  const [valueSearch,setValueSearch] = useState("")
  
  const timeoutID = useRef();
  
  const handleChangeInput = (e) => {
    let value = e.target.value
    setValueSearch(value)
    if (timeoutID.current) {
      clearTimeout(timeoutID.current);
    };
    timeoutID.current = setTimeout(() => {
    updateFilter({ ...filter, search:value, offset: 0 })
    },1500);
  }

  return (
    <Fragment>
      <TextField
        variant="outlined"
        value={valueSearch}
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
              onClick={() =>{
                setValueSearch("") 
                updateFilter({ ...filter, search: "" })
              }}>
              <CloseIcon />
            </IconButton>
          )
        }}
        classes={{
          root: classes.textfield
        }}
        onChange={handleChangeInput}
      />
    </Fragment>
  );
};

export default Search;
