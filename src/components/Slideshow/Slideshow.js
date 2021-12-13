import React from "react";
import Carousel from "react-material-ui-carousel";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  indicators: {
    fontSize: 12,
    color: "rgba(0, 0, 0, 0.14)",
  },
  active: {
    fontSize: 12,
    color: "rgba(45, 40, 102, 0.8)",
  },
  root: {
    "& .Carousel-buttonWrapper-192": {
      height: 40,
    },
  },
}));

const Slideshow = (props) => {

  const { autoPlay, navBtnVisible, animation, activeClass, indicatorClass, children, fullHeightHover } = props;

  const classes = useStyles();

  return (
    <Carousel
      autoPlay={autoPlay}
      navButtonsAlwaysVisible={navBtnVisible}
      animation={animation}
      indicatorProps={{className: clsx(indicatorClass, classes.indicators)}}
      activeIndicatorProps={{className: clsx(activeClass, classes.active)}}
      fullHeightHover={fullHeightHover}
      className={classes.root}
    >
      { children }
    </Carousel>
  );

};

Slideshow.propTypes = {
  autoPlay: PropTypes.bool,
  navBtnVisible: PropTypes.bool,
  animation: PropTypes.oneOf(["slide", "fade"]),
  indicatorClass: PropTypes.string,
  activeClass: PropTypes.string,
  fullHeightHover: PropTypes.bool
};

Slideshow.defaultProps = {
  autoPlay: false,
  navBtnVisible: true,
  animation: "slide",
  indicatorClass: "",
  activeClass: "",
  fullHeightHover: false,
}

export default Slideshow;