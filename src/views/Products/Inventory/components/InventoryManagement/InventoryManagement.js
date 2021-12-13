import { Box, makeStyles } from "@material-ui/core";
import { ErrorMessage, FormBlock, PopUpDialog } from "components";
import React, { Fragment, useEffect, useState } from "react";
import useApi from "utils/api/useApi";
import { DialogStyles, DropzoneStyles } from "utils/constants/styles";
import useFormHandler from "utils/forms/useFormHandler";
import { useAsyncTask } from "utils/tools";
import { formStructure } from "./inventoryManagementConfig";

const useStyles = makeStyles(theme => ({
  root: {},
  ...DialogStyles,
  ...DropzoneStyles,
}));

let mounted = false;
const InventoryManagement = (props) => {

  const { open, handleClose } = props;

  const classes = useStyles();
  const api = useApi();
  const [fields, values, errors, setValues, setErrors, setDirtys] = useFormHandler(formStructure); // eslint-disable-line
  const [platforms, setPlatforms] = useState([]); // eslint-disable-line

  const [run, load, error] = useAsyncTask("inventory-management");

  const messages = {
    "file not found:image": "The file you've uploaded cannot be found. Please check that the file exists or contact the support staff.",
    "file not image": "Oops, it seems your file is not an image. Please submit an image."
  }

  useEffect(() => {
    mounted = true;
    run(async () => {
      const platformList = await api.path("inventory/platform/list").get();
      const items = platformList?.data?.result?.models;
      mounted && setPlatforms(items);
    })
    return () => mounted = false;
  }, []) // eslint-disable-line

  return (
    <Fragment>
      <PopUpDialog
        title={
          <div className={classes.titleText}>
            Manage Inventories
          </div>
        }
        content={
          <Fragment>
            <ErrorMessage message={error?.message} map={messages} />
            <Box>
              <FormBlock
                handleSubmit={() => {}}
                error={error}
                messages={messages}
                fields={fields}
                errors={errors}
                loading={load}
                buttonTitle="Add Inventory"
                errorClass={classes.error}
              />
            </Box>
          </Fragment>
        }
        open={open}
        handleClose={handleClose}
        titleClass={classes.title}
        contentClass={classes.content}
        className={classes.root}
        fullWidth={true}
      />
    </Fragment>
  );
};

export default InventoryManagement;