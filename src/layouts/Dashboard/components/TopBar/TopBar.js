import { AppBar, Button, colors, Hidden, IconButton, Toolbar, Typography } from "@material-ui/core";
import InputIcon from "@material-ui/icons/Input";
import MenuIcon from "@material-ui/icons/Menu";
import {ReactComponent as Logo} from "assets/images/logo/white-kidztime-logo.svg";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Actions } from "store";

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: "none"
  },
  toolbarRegular: {
    justifyContent: "space-between",
    [theme.breakpoints.up("sm")]: {
      minHeight: 56,
    }
  },
  toolbarGutters: {
    [theme.breakpoints.up("sm")]: {
      paddingLeft: 16,
      paddingRight: 16
    }
  },
  flexGrow: {
    flexGrow: 1
  },
  notificationsButton: {
    marginLeft: theme.spacing(1)
  },
  notificationsBadge: {
    backgroundColor: colors.orange[600]
  },
  companyName: {
    color: "#FFF",
    fontSize: 14
  },
  logoLink: {
    display: "flex",
    alignItems: "center",
    padding: "0px 8px"
  },
  logo: {
    width: 42,
    maxHeight: 42
  },
  logoutButton: {
    marginLeft: theme.spacing(1),
    fontSize: 14
  },
  logoutIcon: {
    marginRight: theme.spacing(1),
    fontSize: 18
  }
}));

const TopBar = props => {
  const { onOpenNavBarMobile, className, ...rest } = props;

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(Actions.Session.logout());
  };

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary" >
      <Toolbar classes={{regular: classes.toolbarRegular, gutters: classes.toolbarGutters}}>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onOpenNavBarMobile}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Hidden mdDown>
          <Typography variant="h6" className={classes.companyName}>KIDZTIME</Typography>
        </Hidden>
        <Hidden lgUp>
          <RouterLink to="/" className={classes.logoLink}>
            <Logo className={classes.logo} />
          </RouterLink>
        </Hidden>
        <Hidden mdDown>
          <Button
            className={classes.logoutButton}
            color="inherit"
            onClick={handleLogout}>
            <InputIcon className={classes.logoutIcon} />
            Sign Out
          </Button>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            className={classes.logoutButton}
            color="inherit"
            onClick={handleLogout}>
            <InputIcon className={classes.logoutIcon} />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onOpenNavBarMobile: PropTypes.func
};

export default TopBar;
