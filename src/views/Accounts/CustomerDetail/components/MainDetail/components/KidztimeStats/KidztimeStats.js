import { makeStyles } from "@material-ui/core";
import { TopBox } from "components";
import React, { Fragment } from "react";

const useStyles = makeStyles(theme => ({
  card: {
    marginLeft: theme.spacing(2),
  }
}));

const KidztimeStats = (props) => {
  const classes = useStyles();
  // const { id } = props;
  // const api = useApi();

  // const [run, loading, error] = useAsyncTask("account-points"); // eslint-disable-line

  // useEffect(() => {
  //   run(async () => {
  //     const response = await api.path("account/statistics", { account_id: id }).get();
  //   })
  // }, [])

  const boxes = [{
    title: "0 Pts",
    subtitle: "Kidztime Smiles Points",
    loading: false,
  }];

  return (
    <Fragment>
      {boxes.map((box, id) =>
        <TopBox box={box} cardClass={classes.card} key={id} />
      )}
    </Fragment>
  );
}

export default KidztimeStats;