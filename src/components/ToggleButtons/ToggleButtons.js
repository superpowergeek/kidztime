import { makeStyles } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import clsx from "clsx";
import React from "react";
import { IndivBtnContent } from "./components";

const useStyles = makeStyles(theme => ({
  tabgroup: {
    [theme.breakpoints.only("xs")]: {
      display: "block",
    },
  },
  tab: {
    minWidth: 50,
    padding: "12px 16px",
    "&.MuiToggleButton-root.Mui-selected": {
      backgroundColor: "#e9f1ff",
      borderColor: theme.palette.primary.main,
    },
  },
  tabRes: {
    [theme.breakpoints.down("sm")]: {
      padding: 12,
      minHeight: 78,
      width: "50%",
      minWidth: "unset",
      "&.MuiToggleButtonGroup-groupedHorizontal:not(:first-child)": {
        borderLeftColor: "rgba(0, 0, 0, 0.12)",
      },
      "&.MuiToggleButton-root.Mui-selected": {
        borderLeftColor: "#2D2866",
      },
    },
    [theme.breakpoints.only("xs")]: {
      "&.MuiToggleButtonGroup-groupedHorizontal": {
        borderRadius: 0,
      },
    },
  },
  tabLabel: {
    display: "block",
  },
  label: {
    fontSize: 11,
  },
  img: {
    width: 36,
    objectFit: "cover",
    display: "block",
    margin: "0px auto",
  },
  center: {
    display: "flex",
    justifyContent: "center"
  }
}));

const ToggleButtons = (props) => {
  const { labels, initial, title, responsive, clickFunc } = props;
  // const [platforms, setPlatforms] = useState(initial);
  const classes = useStyles();

  // const clickFunc = (value) => {
  //   if (platforms.indexOf(value) > -1) {
  //     setPlatforms(platforms.filter((platform) => platform !== value));
  //   } else {
  //     setPlatforms(platforms.concat([value]));
  //   }
  // };

  return (
    <ToggleButtonGroup value={initial} className={clsx({ [classes.tabgroup]: responsive })}>
      {
        labels.map((btn, index) => {
          const val = btn.title.toLowerCase();
          return (
            <ToggleButton
              value={val}
              aria-label={val}
              key={index}
              className={clsx(classes.tab, { [classes.tabRes]: responsive })}
              classes={{ label: classes.tabLabel }}
              onClick={() => {
                if (btn.onClick && typeof btn.onClick === "function") btn.onClick();
                clickFunc(val);
              }}
            >
              <IndivBtnContent btn={btn} val={val} title={title} responsive={responsive} />
            </ToggleButton>
          );
        })
      }
    </ToggleButtonGroup>
  );
};

ToggleButtons.defaultProps = {
  initial: [],
  title: false,
  responsive: true,
};

export default ToggleButtons;