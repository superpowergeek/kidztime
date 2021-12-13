/* eslint-disable no-undef */
import PropTypes from "prop-types";
import React, { useEffect, Fragment } from "react";
import { Helmet } from "react-helmet";
import { useRouter } from "utils/tools";
import { makeStyles, Typography } from "@material-ui/core";
import clsx from 'clsx';
import { PagesNav, RenderGuard } from "components";

const NODE_ENV = process.env.NODE_ENV;
const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  pagesNav: {
    marginBottom: theme.spacing(1),
  }
}));

const Page = props => {
  const { title, children, dashboard, className, pagesNav, ...rest } = props;

  const classes = useStyles();
  const router = useRouter();

  useEffect(() => {
    if (NODE_ENV !== "production") {
      return;
    }

    if (window.gtag) {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: router.location.pathname,
        page_name: title
      });
    }
  }, [title, router]);

  return (
    <div className={ clsx(className, classes.root) } {...rest}>
      <Helmet>
        <title>{title + " - Kidztime"}</title>
      </Helmet>
      {
        dashboard === true ? 
        <Fragment>
          <Typography variant="h3" className={classes.title}>{ title }</Typography>
          <RenderGuard renderIf={pagesNav}>
            <PagesNav className={classes.pagesNav} pagesNav={pagesNav} />
          </RenderGuard>
        </Fragment> :
        null
      }
      {children}
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  dashboard: PropTypes.bool,
  pagesNav: PropTypes.object,
};

Page.defaultProps = {
  dashboard: false,
  className: '',
  pagesNav: null,
};

export default Page;
