import { Checkbox, Grid, makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import { ErrorMessage, LoadButton, PopUpDialog } from "components";
import { useSnackbar } from "notistack";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useApi from "utils/api/useApi";
import { DialogStyles } from "utils/constants/styles";
import { useAsyncTask } from "utils/tools";
import { checkPrivilege, initPrivileges } from "utils/tools/privileges";
import { messages, roleScope } from "./privilegeConfig";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    "& .MuiDialog-paperWidthSm": {
      minWidth: 400,
    }
  },
  ...DialogStyles,
  checkBox: {
    paddingLeft: 0,
  },
  marBottom: {
    marginBottom: 12,
  },
  removePad: {
    paddingLeft: "0px !important",
    paddingRight: "0px !important",
  },
  form: {
    margin: "6px 0px 12px",
  },
  submitButton: {
    width: "100%",
  },
}));

let mounted = false;

const PrivilegeDialog = (props) => {
  const { user, setUser, open, handleClose } = props;
  const api = useApi();
  const classes = useStyles();
  const signInUser = useSelector(state => state.Session.user);
  const [models, setModels] = useState([]);
  const [checked, setChecked] = useState({});
  const [runPrivileges, loading, error] = useAsyncTask("privileges");
  const { enqueueSnackbar } = useSnackbar();

  const reload = () => {
    runPrivileges(async () => {
      const response = await api.path("privilege/list").get();
      const items = response.data.result.models ? response.data.result.models : [];
      const vals = initPrivileges(items, user);
      mounted && setChecked(vals);
      mounted && setModels(items);
    });
  };

  useEffect(() => {
    mounted = true;
    reload();
    return () => mounted = false;
  }, [user]); // eslint-disable-line

  const changeChecked = (name) => {
    setChecked({
      ...checked,
      [name]: {
        ...checked[name],
        checked: !checked[name].checked,
      }
    })
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (!user || user === null) throw new Error("model not found:account");
    if (checkPrivilege(signInUser.privileges, roleScope) === false) throw new Error("unauthorized:no_privilege");

    let values = Object.values(checked);
    let bodyInt = [];
    values.forEach((value, index) => {
      if (value.checked === true) {
        bodyInt.push(value.id);
      }
    });
    let body = {
      "privileges": bodyInt
    };
    runPrivileges(async () => {
      const response = await api.path("account/privilege", { account_id: user.id }).post({ body });
      let newUser = response?.data?.result?.model;
      setUser(newUser);
      enqueueSnackbar("Privileges Successfully Updated!", { variant: "success" });
      handleClose();
    });
  };

  return (
    <Fragment>
      <PopUpDialog
        title={
          <div className={classes.titleText}>
            Update Privileges
          </div>
        }
        content={
          <Fragment>
            <form onSubmit={handleSubmit}>
              <ErrorMessage message={error?.message} map={messages} className={classes.error} />
              <Grid container spacing={2} alignItems="center" className={classes.form}>
                {
                  models.map((model, index) => {
                    models[index].label = model.label.replace("Kidztime ", "");
                    return (
                      <Fragment key={index}>
                        <Grid item xs={2} className={index < models.length ? clsx(classes.marBottom, classes.removePad) : classes.removePad}>
                          <Checkbox name={model.id.toString()} checked={checked[model.name].checked} onChange={() => changeChecked(model.name)} />
                        </Grid>
                        <Grid item xs={10} className={index < models.length ? clsx(classes.marBottom, classes.removePad) : classes.removePad}>
                          <Typography variant="h5" style={{ marginBottom: 3 }}>{model.label}</Typography>
                          {model.description}
                        </Grid>
                      </Fragment>
                    );
                  })
                }
              </Grid>
              <LoadButton
                variant="contained"
                padding={4}
                load={loading}
                size="large"
                disabled={!!loading}
                type="submit"
                color="secondary"
                className={classes.submitButton}>
                Update Privileges
              </LoadButton>
            </form>
          </Fragment>
        }
        open={open}
        handleClose={handleClose}
        titleClass={classes.title}
        contentClass={classes.content}
        className={classes.root}
      />
    </Fragment>
  );
};

export default PrivilegeDialog;