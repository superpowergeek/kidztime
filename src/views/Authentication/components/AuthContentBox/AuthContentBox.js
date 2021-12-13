import { Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as Logo } from "assets/images/logo/white-kidztime-logo.svg";
import React from "react";

const useStyles = makeStyles(theme => ({
  card: {
    width: theme.breakpoints.values.md,
    maxWidth: "100%",
    overflow: "unset",
    display: "flex",
    position: "relative",
    "& > *": {
      flexGrow: 1,
      flexBasis: "50%",
      width: "50%"
    },
    [theme.breakpoints.down("md")]: {
      width: 480
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      maxWidth: 480,
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3)
    }
  },
  content: {
    padding: theme.spacing(8, 4, 7, 4),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(8, 2, 7, 2)
    }
  },
  logoBox: {
    width: 74,
    height: 74,
    padding: 14,
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    borderRadius: 10,
    position: "absolute",
    top: -38,
    backgroundColor: "#2D2866"
  },
  logo: {
    width: 48,
    maxHeight: 48
  },
}));

const AuthContentBox = ({ children, media, width }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} style={{width}}>
      <CardContent className={classes.content}>
        <div className={classes.logoBox}>
          <Logo className={classes.logo} />
        </div>
        {children}
      </CardContent>
      {media}
    </Card >
  )
}

export default AuthContentBox;