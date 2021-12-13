import { Paper, Tab, Tabs } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";

const TabsSection = (props) => {
  const { className, labels, panels, panelClass, panelPaper, onChange } = props;

  const [value, setValue] = useState(0);

  if (panelPaper === true) {
    return (
      <Fragment>
        <Tabs
          value={value}
          indicatorColor="secondary"
          textColor="secondary"
          variant="scrollable"
          scrollButtons="off"
          className={className}
          onChange={onChange}>
          {labels.length > 0 ?
            labels.map((each, index) =>
              <Tab
                key={index}
                label={each}
                onClick={() => setValue(index)}
              />
            ) : null}
        </Tabs>
        <Paper elevation={1} className={panelClass}>
          {panels?.length && 
            panels.map((each, index) => 
              <div key={index} role="tabpanel" hidden={value !== index}>
                {value === index && each}
              </div>
            )}
        </Paper>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Tabs
          value={value}
          indicatorColor="secondary"
          textColor="secondary"
          variant="scrollable"
          scrollButtons="off"
          className={className}
          onChange={onChange}>
          {labels.length > 0 ?
            labels.map((each, index) =>
              <Tab
                key={index}
                label={each}
                onClick={() => setValue(index)}
              />
            ) : null}
        </Tabs>
        {panels?.length &&panels.map((each, index) =>
            <div role="tabpanel" hidden={value !== index} key={index}>
            {value === index && each}
            </div>
          )}
      </Fragment>
    );
  }
};

TabsSection.propTypes = {
  labels: PropTypes.array.isRequired,
  panels: PropTypes.array.isRequired,
  className: PropTypes.string,
};

TabsSection.defaultProps = {
  labels: [],
  panels: [],
  panelPaper: true,
}

export default TabsSection;