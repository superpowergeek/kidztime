import { makeStyles, Typography } from "@material-ui/core";
import { RenderGuard, TabsSection } from "components";
import React from "react";
import { ScrollBarStyles } from "utils/constants";
import { KidztimeStats, OrderHistory, OrderStats, PointHistory } from "./components";
import { mainTabs } from "./mainDetailConfig";

const useStyles = makeStyles(theme => ({
  mainPaper: {
    marginTop: theme.spacing(5),
  },
  panelContent: {
    marginTop: theme.spacing(3),
  },
  overview: {
    marginTop: theme.spacing(3),
    display: "flex",
    ...ScrollBarStyles,
  },
}));

const MainDetail = (props) => {

  const { loading, user } = props;

  const classes = useStyles();

  return (
    <RenderGuard renderIf={!loading && user}>
      <Typography variant="h3">{ user?.firstname } { user?.lastname }</Typography>
      <div className={classes.overview}>
        <OrderStats id={user?.id} />
        <KidztimeStats id={user?.id} />
      </div>
      <TabsSection
        labels={mainTabs}
        panels={[
          <OrderHistory id={user?.id} />,
          <PointHistory id={user?.id} />,
        ]}
        className={classes.mainPaper}
        panelClass={classes.panelContent}
      />
    </RenderGuard>
  );
};

export default MainDetail;