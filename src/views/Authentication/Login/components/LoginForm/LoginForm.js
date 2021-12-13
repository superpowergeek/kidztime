import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { FormBlock } from "components";
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "store";
import useApi from "utils/api/useApi";
import { Paths } from "utils/constants";
import { checkPrivilege } from "utils/tools/privileges";
import { useAsyncTask } from "utils/tools";
import useFormHandler from "utils/forms/useFormHandler";
import { useRouter } from "utils/tools";
import { submitButton } from "utils/constants/styles";
import moment from "moment";
import { messages, formStructure } from "./loginConfig";

const useStyles = makeStyles(theme => ({
  root: {},
  error: {
    marginBottom: theme.spacing(3),
  },
  textField: {
    margin: theme.spacing(1, 0),
    width: "100%",
  },
  submitButton: submitButton
}));

const LoginForm = (props) => {

  const { className } = props;

  const api = useApi();
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const [fields, values, errors] = useFormHandler(formStructure);
  const [runLogin, loading, error] = useAsyncTask("login");

  const handleSubmit = event => {
    event && event.preventDefault();

    if (errors) return;
    runLogin(async () => {
      const { email, password } = values;
      const body = {
        "username": email,
        "password": password,
      };
      const response = await api.path("account/login").post({ body });
      const user = response.data.result?.self || {};
      if (!user || !user.privileges) throw new Error("no account found");
      if (checkPrivilege(user.privileges) === false) {
        router.history.push(Paths.Error.Unauthorized);
        return;
      }
      const token = response.data.result.access?.token;
      const expires_at = moment(new Date(response.data.result.access.expires_at * 1000));
      dispatch(Actions.Session.login({
        token, expires_at, user,
      }));
    })
  };

  return (
    <Fragment>
      <FormBlock
        className={clsx(className, classes.root)}
        handleSubmit={handleSubmit}
        error={error}
        messages={messages}
        fields={fields}
        errors={errors}
        loading={loading}
        buttonTitle="Log In"
        errorClass={classes.error}
      />
    </Fragment>
  );
};

export default LoginForm;