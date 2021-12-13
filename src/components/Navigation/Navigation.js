// import classes from '*.module.css';
/* eslint-disable react/no-multi-comp */
import { List, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { matchPath } from "react-router-dom";
import { useRouter } from "utils/tools";
import { NavigationListItem } from "./components";


const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: 0
  }
}));

const filterProjectsAndRoles = (page/*, account*/) => {
  return true;
  // if (account && account.roles.includes("superadmin")) return true;
  // if (!page.projects && !page.roles) return true;
  // let allow = false;
  // if (page.projects) {
  //   allow = page.projects.filter(project => {
  //     if (typeof project === "string")
  //       project = [project];
  //     if (Array.isArray(project)) return project.every(val => account.projects.includes(val));
  //     return false;
  //   }).length > 0;
  // }
  // if (page.roles) {
  //   allow = page.roles.filter(role => {
  //     if (typeof role === "string")
  //       role = [role];
  //     if (Array.isArray(role)) return role.every(val => account.roles.includes(val));
  //     return false;
  //   }).length > 0;
  // }
  // return allow;
}


const NavigationList = props => {
  const { pages, className,/*account,*/ ...rest } = props;
  return (
    <List classes={{padding: className}}>
      {pages.filter(page => filterProjectsAndRoles(page/*, account*/)).reduce(
        (items, page) => reduceChildRoutes({ items, page/*, account*/, ...rest }),
        []
      )}
    </List>
  );
};

NavigationList.propTypes = {
  depth: PropTypes.number,
  pages: PropTypes.array
};

const reduceChildRoutes = props => {
  const { router, page/*, account*/, depth } = props;
  let items = props.items.filter(page => filterProjectsAndRoles(page/*, account*/));
  if (page.children) {
    let open;
    page.children.forEach((each) => {
      if (each.href === router.location.pathname) {
        open = matchPath(router.location.pathname, {
          path: each.href,
          exact: false
        });
      }
    });

    items.push(
      <NavigationListItem
        depth={depth}
        icon={page.icon}
        key={page.title}
        label={page.label}
        open={Boolean(open)}
        title={page.title}
      >
        <NavigationList
          depth={depth + 0.8}
          pages={page.children}
          router={router}
          // account={account}
        />
      </NavigationListItem>
    );
  } else {
    items.push(
      <NavigationListItem
        depth={depth}
        href={page.href}
        icon={page.icon}
        key={page.title}
        label={page.label}
        title={page.title}
      />
    );
  }

  return items;
};

const Navigation = props => {
  const { /*account,*/ title, pages, className, component: Component, ...rest } = props;
  const classes = useStyles();
  const router = useRouter();

  return (
    <Component
      {...rest}
      className={clsx(classes.root, className)}
    >
      {title && <Typography variant="overline">{title}</Typography>}
      <NavigationList
        // account={account}
        depth={0}
        pages={pages}
        router={router}
        className={classes.root}
      />
    </Component>
  );
};

Navigation.propTypes = {
  className: PropTypes.string,
  component: PropTypes.any,
  pages: PropTypes.array.isRequired,
  title: PropTypes.string
};

Navigation.defaultProps = {
  component: "nav"
};

export default Navigation;
