import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  root: {},
  btnResponse: {
    padding: "10px 16px",
    marginRight: theme.spacing(1),
    "&:last-child": {
      marginRight: 0,
    },
  },
}));

const ButtonGroup = (props) => {
  const { btnClass, buttons, className } = props;

  const classes = useStyles();
  const btnValues = Object.values(buttons);

  if (btnValues.length > 0) {
    return (
      <div className={clsx(classes.root, className)}>
        {
          btnValues.map((button, index) => {
            return (
              <Button
                key={index}
                className={clsx(classes.btnResponse, btnClass)}
                variant="contained"
                size={button?.size || "medium"}
                startIcon={button?.icon}
                onClick={button?.onClick}
                style={button?.style}
              >
                { button.title }
              </Button>
            );
          })
        }
      </div>
    );
  } else return null;
};

ButtonGroup.defaultProps = {
  btnClass: "",
  buttons: {},
  className: "",
};

export default ButtonGroup;