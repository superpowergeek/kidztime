import React from "react";
import { Breadcrumbs, Link, makeStyles, Typography } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles(() => ({
  crumbs: {
    fontSize: 12
  }
}));

const PagesNav = (props) => {
  const classes = useStyles();
  const { className, pagesNav } = props;
  
  const text = Object.keys(pagesNav);
  const urls = Object.values(pagesNav);

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      className={className}
    >
      {
        text.map((each, index) => {
          if (index === text.length - 1) {
            return (
              <Typography color="textPrimary" key={index} className={classes.crumbs}>{ text[index] }</Typography>
            );
          } else {
            return (
              <Link component={RouterLink} color="inherit" to={urls[index]} key={index} className={classes.crumbs}>
                { text[index] }
              </Link>
            );
          }
        })
      }
    </Breadcrumbs>
  );
};

export default PagesNav;