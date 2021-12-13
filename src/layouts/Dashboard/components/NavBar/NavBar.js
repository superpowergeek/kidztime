import { Button, colors, Drawer, Hidden, ListItem, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputIcon from "@material-ui/icons/Input";
import { ReactComponent as Logo } from "assets/images/logo/dashboard-logo.svg";
import clsx from "clsx";
import { Navigation, NGNRSFooter } from "components";
import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Actions } from "store";
import { useRouter } from "utils/tools";
import navigationConfig from "./navigationConfig";

const useStyles = makeStyles(theme => ({
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightBold,
    "& $icon": {
      color: theme.palette.primary.main
    }
  },
  root: {
    height: "100%",
    overflowY: "auto",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  content: {
    padding: theme.spacing(2)
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content"
  },
  name: {
    marginTop: theme.spacing(1)
  },
  navigation: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  itemLeaf: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0
  },
  buttonLeaf: {
    color: colors.blueGrey[800],
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontWeight: theme.typography.fontWeightRegular,
    "&.depth-0": {
      fontWeight: theme.typography.fontWeightMedium
    }
  },
  icon: {
    color: theme.palette.icon,
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(1)
  }
}));

const SignOutSidebar = () => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(Actions.Session.logout());
  }

  return (
    <ListItem
      className={classes.itemLeaf}
      disableGutters
    >
      <Button
        className={clsx(classes.buttonLeaf, `depth-0`)}
        style={{ paddingLeft: 8 }}
        onClick={handleLogout}
      >
        <InputIcon className={classes.icon} />
        Sign Out
      </Button>
    </ListItem>
  );
}

const NavBar = props => {
  const { openMobile, onMobileClose, className, ...rest } = props;

  const classes = useStyles();
  const router = useRouter();

  useEffect(() => {
    if (openMobile) {
      onMobileClose && onMobileClose();
    }
  }, [router.location.pathname]); // eslint-disable-line

  const navbarContent = (
    <div className={classes.content}>
      <div className={classes.profile}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
      </div>
      <nav className={classes.navigation}>
        {navigationConfig.map(list => (
          <Navigation
            // account={account}
            component="div"
            key={list.title}
            pages={list.pages}
            title={list.title}
          />
        ))}
        <SignOutSidebar />
      </nav>
    </div>)


  return (
    <Fragment>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary">
          <div {...rest} className={clsx(classes.root, className)}>
            {navbarContent}
            <div className={classes.footer}>
              <NGNRSFooter />
            </div>
          </div>
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Paper
          {...rest}
          className={clsx(classes.root, className)}
          elevation={1}
          square>
          <div>{navbarContent}</div>
          <NGNRSFooter />
        </Paper>
      </Hidden>
    </Fragment>
  );
};

NavBar.propTypes = {
  className: PropTypes.string,
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default NavBar;
