import { makeStyles } from "@material-ui/core";
import { ErrorMessage, LoadButton, PopUpDialog } from "components";
import React, { Fragment } from "react";
import { ButtonStyles, DialogStyles } from "utils/constants/styles";
import { useAsyncTask, useRouter } from "utils/tools";
import { messages } from "./deleteConfig";

const useStyles = makeStyles(theme => ({
  root: {},
  title: {
    paddingTop: 36,
    paddingBottom: 6,
    paddingLeft: 32,
    padding: "36px 32px 6px 32px",
  },
  titleText: DialogStyles.titleText,
  content: {
    paddingLeft: theme.spacing(4),
    paddingBottom: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
  contentBox: {
    fontSize: 14,
  },
  submitButton: {
    ...ButtonStyles.DELETE.style,
    width: "100%",
    marginTop: 36,
  },
  error: {
    marginBottom: theme.spacing(2),
  }
}));

const DeleteDialog = (props) => {
  const { handleClose, del, name, open, redirect, handleDelete, overwriteTitle, overwriteMessage, overwriteButton } = props;
  const classes = useStyles();
  const router = useRouter();
  const [runDelete, loading, error] = useAsyncTask(`${name}-delete`);

  const onDelete = (id) => {
    runDelete(async () => {
      const response = await del();
      handleDelete && handleDelete(response?.data?.result);
      if (redirect) {
        router.history.push(redirect);
      }
    });
  }

  return (
    <Fragment>
      <PopUpDialog
        title={
          <div className={classes.titleText}>
            {overwriteTitle || `Delete ${name}`}
          </div>
        }
        content={
          <Fragment>
            <div className={classes.contentBox}>
              {overwriteMessage || `Are you sure you want to delete this ${name.toLowerCase()}?`}
            </div>
            <ErrorMessage message={error?.message} map={messages} className={classes.error} />
            <LoadButton
              variant="contained"
              padding={4}
              size="large"
              load={loading}
              disabled={loading}
              className={classes.submitButton}
              onClick={() => onDelete(open)}
            >
              {overwriteButton || `Delete ${name}`}
            </LoadButton>
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

DeleteDialog.defaultProps = {
  name: "Customer",
  redirect: null,
};

export default DeleteDialog;