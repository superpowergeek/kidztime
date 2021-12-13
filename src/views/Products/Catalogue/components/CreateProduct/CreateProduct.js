import { Accordion, AccordionDetails, AccordionSummary, makeStyles, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import { ErrorMessage, ImageDropzone, InputGroup, LoadButton, PopUpDialog } from "components";
import { useSnackbar } from "notistack";
import React, { Fragment, useEffect } from "react";
import useApi from "utils/api/useApi";
import { DialogStyles, DropzoneStyles } from "utils/constants/styles";
import { getHandle } from "utils/forms";
import useFormHandler from "utils/forms/useFormHandler";
import { useAsyncTask } from "utils/tools";
import { formStructure, messages } from "./createProductConfig";

const useStyles = makeStyles(theme => ({
  root: {},
  addContent: {
    maxHeight: 480,
  },
  ...DialogStyles,
  ...DropzoneStyles,
  back: {
    backgroundColor: "#F4F6F8",
  },
  textField: {
    margin: "2px 0px",
    width: "100%",
  },
  submitButton: {
    width: "100%",
  },
  accordion: {
    "&.MuiPaper-elevation1": {
      boxShadow: "none",
    },
    "&.MuiAccordion-root:before": {
      height: 0,
    },
    "&.MuiAccordion-root.Mui-expanded": {
      margin: "8px 0",
    }
  },
  sumRoot: {
    "&.Mui-expanded": {
      minHeight: 52,
    },
  },
  summary: {
    flexGrow: 0,
    margin: "16px 0",
    "&.Mui-expanded": {
      margin: "10px 0px",
    },
  },
  iconBtn: {
    padding: "14px 12px",
    "&.Mui-expanded": {
      padding: 12,
    },
  },
  details: {
    padding: "8px 0px 16px",
  },
}));

const CreateProduct = (props) => {
  const { open, handleClose } = props;
  const api = useApi();
  const classes = useStyles();
  const [runCreate, load, error, setError] = useAsyncTask("product-create");
  const [fields, values, errors, setValues, setErrors, setDirtys] = useFormHandler(formStructure); // eslint-disable-line
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // resetting form when modal is closed
    if (!open) {
      let initialState = Object.keys(formStructure).reduce((acc, key) => {
        acc[key] = formStructure[key].initialValue;
        return acc;
      }, {});
      setValues(initialState);
      setError(null);
      setErrors(null);
      setDirtys({})
    }
  }, [open]); // eslint-disable-line

  const nameField = fields.find(field => field.key === "name");

  nameField.onChange = (ev) => {
    setValues({
      ...values,
      name: ev.target.value,
      handle: getHandle(ev.target.value),
    });
  };

  const handleCreate = (ev) => {
    ev.preventDefault();

    runCreate(async () => {
      const { name, alt_name, handle, sku, upc, stock, price, material, status, description, image } = values;
      let body = {
        name, alt_name, handle, sku, upc, stock, price, material, status, description
      };
      const response = await api.path("product/create").post({ body });
      let model = response?.data?.result?.model;
      if (model) {
        if (!image) {
          handleClose();
          enqueueSnackbar("Product Successfully Created!", { variant: "success" });
          return;
        };
        if (!image.type.match(/image.*/)) throw new Error("file not image");

        const formData = new FormData();
        formData.append("image", image);
        const result = await api.path("product/preview/add", { product_id: model.id }).multipost({ body: formData });
        if (result?.data?.result) {
          handleClose();
          enqueueSnackbar("Product Successfully Created with Image!", { variant: "success" });
        }
      }
    });
    return false;
  }

  return (
    <Fragment>
      <PopUpDialog
        title={
          <div className={classes.titleText}>
            Create Product
          </div>
        }
        content={
          <Fragment>
            <form onSubmit={handleCreate}>
              <ErrorMessage message={error?.message} map={messages} />
              <InputGroup
                className={classes.textField}
                fields={fields}
              />
              <Accordion className={classes.accordion}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  classes={{
                    root: classes.sumRoot,
                    content: classes.summary
                  }}
                  IconButtonProps={{
                    classes: {
                      root: classes.iconBtn,
                    }
                  }}>
                  <Typography className={classes.heading}>Add Preview Image</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                  <ImageDropzone
                    image={values.image || null}
                    error={error}
                    errors={errors}
                    setError={setError}
                    handleUpdate={(file) => { setValues({ ...values, image: file }) }}
                    updateLabel="Confirm"
                    className={clsx(classes.dropzone, classes.back)}
                    mediaClass={clsx(classes.boxHeight, classes.media)}
                    fileLoading={load}
                    purpose="form"
                    loaderClass={classes.boxHeight}
                  />
                </AccordionDetails>
              </Accordion>
              <LoadButton
                variant="contained"
                padding={4}
                load={load}
                size="large"
                disabled={load}
                className={classes.submitButton}
                type="submit"
                color="secondary"
              >
                Create Product
              </LoadButton>
            </form>
          </Fragment>
        }
        open={open}
        handleClose={handleClose}
        titleClass={classes.title}
        contentClass={clsx(classes.content, classes.addContent)}
        className={classes.root}
      />
    </Fragment>
  )
};

export default CreateProduct;