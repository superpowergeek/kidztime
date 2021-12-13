import React from "react";
import { makeStyles } from "@material-ui/core";
import { SectionPaper, TabsSection, ToggleButtons } from "components";
import { Exports, InitialValues, Platforms } from "./listPlatformConfig";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  root: {},
  panel: {
    marginTop: theme.spacing(3),
    width: "100%",
    display: "flex",
    justifyContent: "center",
  }
}));

const ListPlatforms = (props) => {

  const { className } = props;

  const classes = useStyles();

  return (
    <SectionPaper className={clsx(className, classes.root)} title="Publications">
      <TabsSection
        labels={
          ["Platforms", "Exports"]
        }
        panels={
          [
            <div className={classes.panel}>
              <ToggleButtons
                labels={Platforms}
                initial={InitialValues}
                clickFunc={(value) => console.log(value)}
              />
            </div>,
            <div className={classes.panel}>
              <ToggleButtons
                labels={Exports}
                initial={InitialValues}
                title={true}
                clickFunc={(value) => console.log(value)}
              />
            </div>
          ]
        }
        panelPaper={false}
      />
    </SectionPaper>
  );
};

export default ListPlatforms;