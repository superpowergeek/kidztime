// import { Button, Grid } from "@material-ui/core";
// import FilterListIcon from "@material-ui/icons/FilterList";
import { makeStyles } from "@material-ui/core/styles";
import { ButtonGroup } from "components";
// import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { Search } from "./components";

const useStyles = makeStyles(theme => ({
  // filterButton: {
  //   marginLeft: "auto"
  // },
  // filterIcon: {
  //   marginRight: theme.spacing(1)
  // },
  root: {
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.only("xs")]: {
      display: "block",
    },
  },
  btnClass: {
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(1),
      width: "100%",
    },
  },
}));

const SearchBar = props => {
  // const { onFilter, onSearch, className, Filter, ...rest } = props;
  const { name, placeholder, buttons } = props;

  const classes = useStyles();

  // const [openFilter, setOpenFilter] = useState(false);

  // const handleFilterOpen = () => {
  //   setOpenFilter(true);
  // };

  // const handleFilterClose = () => {
  //   setOpenFilter(false);
  // };

  return (
    <div className={classes.root}>
      <Search
        name={name}
        placeholder={placeholder}
      />
      <ButtonGroup
        buttons={buttons}
        btnClass={classes.btnClass}
      />
    </div>
    // <Grid
    //   {...rest}
    //   className={clsx(classes.root, className)}
    //   container
    //   spacing={3}
    // >
    //   <Grid item>
    //     <Search
    //       className={classes.search}
    //       onSearch={onSearch}
    //     />
    //   </Grid>
    //   {Filter && onFilter &&
    //     <Fragment>
    //       <Grid item>
    //         <Button
    //           className={classes.filterButton}
    //           color="primary"
    //           onClick={handleFilterOpen}
    //           size="small"
    //           variant="outlined"
    //         >
    //           <FilterListIcon className={classes.filterIcon} /> Show filters
    //     </Button>
    //       </Grid>
    //       <Filter
    //         onClose={handleFilterClose}
    //         onFilter={onFilter}
    //         open={openFilter}
    //       />
    //     </Fragment>
    //   }
    // </Grid>
  );
};

SearchBar.propTypes = {
  className: PropTypes.string,
  onFilter: PropTypes.func,
  onSearch: PropTypes.func
};

SearchBar.defaultProps = {
  buttons: {},
  placeholder: "Button Function"
};

export default SearchBar;
