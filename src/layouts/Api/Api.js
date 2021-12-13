import { LinearProgress } from "@material-ui/core";
import { DashboardGuard } from "components";
import PropTypes from "prop-types";
import React, { Suspense } from "react";
import { renderRoutes } from "react-router-config";

const Api = props => {
  const { route } = props;

  return (
    <DashboardGuard>
      <Suspense fallback={<LinearProgress />}>
        {renderRoutes(route.routes)}
      </Suspense>
    </DashboardGuard>
  );
};

Api.propTypes = {
  route: PropTypes.object
};

export default Api;