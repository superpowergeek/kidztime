import PropTypes from "prop-types";
import React, { Fragment } from "react";

const RenderGuard = props => {
  const { children, component: Component, renderIf } = props;

  return <Component>{!!renderIf ? children : null}</Component>;
};

RenderGuard.propTypes = {
  children: PropTypes.node,
  renderIf: PropTypes.any,
  component: PropTypes.any,
};

RenderGuard.defaultProps = {
  renderIf: false,
  component: Fragment,
};

export default RenderGuard;
