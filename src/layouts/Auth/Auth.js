import { LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import { RenderGuard } from "components";
import PropTypes from "prop-types";
import React, { Fragment, Suspense/*, useEffect*/ } from "react";
// import { useSelector } from "react-redux";
import { renderRoutes } from "react-router-config";
// import useRouter from "utils/useRouter";
// import isAdmin from "utils/isAdmin";

const useStyles = makeStyles(theme => ({
  content: {
    height: "100%"
  }
}));

const Auth = props => {
  const { route } = props;
  const classes = useStyles();
  // const router = useRouter();

  // const profile = useSelector(state => state.profile);
  // useEffect(() => {
  //   if (profile.account && (isAdmin(profile.account)))
  //     router.history.push("/overview");
  //   // eslint-disable-next-line
  // }, [profile.account]);

  return (
    <Fragment>
      <main className={classes.content}>
        {/* <RenderGuard renderIf={!profile.loading}> */}
          <Suspense fallback={<LinearProgress />}>
            {renderRoutes(route.routes)}
          </Suspense>
        {/* </RenderGuard> */}
      </main>
    </Fragment>
  );
};

Auth.propTypes = {
  route: PropTypes.object
};

export default Auth;