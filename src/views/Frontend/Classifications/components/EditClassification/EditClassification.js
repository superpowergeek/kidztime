import { Accordion, AccordionDetails, AccordionSummary, makeStyles, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import { ErrorMessage, ImageDropzone, InputGroup, LoadButton, PopUpDialog } from "components";
import { useSnackbar } from "notistack";
import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "store";
import useApi from "utils/api/useApi";
import { DialogStyles, DropzoneStyles } from "utils/constants/styles";
import { getHandle } from "utils/forms/regex";
import useFormHandler from "utils/forms/useFormHandler";
import { useAsyncTask } from "utils/tools";
import { formStructure, messages } from "./editClassificationConfig";

const tabLabels = {
  character: "Character",
  category: "Category",
  product_type: "Product Type",
}

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
    marginTop: theme.spacing(2),
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

const EditClassification = (props) => {
  const { value, open, handleClose, valueId, model } = props;
  const api = useApi();
  const classes = useStyles();
  const [runCreate, load, error, setError] = useAsyncTask("classification-edit");
  const [fields, values, errors, setValues, setErrors, setDirtys] = useFormHandler(formStructure[value]);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  useEffect(() => {
    // resetting form when modal is closed
    if (!open && model) {
      let initialState = Object.keys(formStructure[value]).reduce((acc, key) => {
        acc[key] = formStructure[value][key].initialValue || getFieldValue(key);
        return acc;
      }, {});
      setValues(initialState);
      setError(null);
      setErrors(null);
      setDirtys({})
    }
  }, [open]); // eslint-disable-line

  const getFieldValue = (key) => {
    if (["min_age", "max_age"].includes(key)) {
      const extras = JSON.parse(model.extras);
      return extras && extras[key];
    }
    else if (["gender"].includes(key)) {
      const extras = JSON.parse(model.extras);
      return extras?.gender;
    }
    else
      return model[key];
  }

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
      const { name, gender, image, min_age, max_age, handle } = values;
      const body = {
        character: { name, handle, gender },
        category: { name, handle },
        product_type: { name, handle, min_age, max_age },
      };
      await api.path(`classification/${value}/update`, { category_id: valueId }).post({ body: body[value] });
      if (!image) {
        enqueueSnackbar(`${tabLabels[value]} Successfully Updated`, { variant: "success" });
      } else {
        if (!image.type.match(/image.*/)) throw new Error("file not image");

        const formData = new FormData();
        formData.append("image", image);
        const result = await api.path("classification/icon", { category_id: valueId }).multipost({ body: formData });
        if (result?.data?.result) {
          enqueueSnackbar(`${tabLabels[value]} Successfully Updated`, { variant: "success" });
        }
      };
      let type = "classifications"
      switch (value) {
        case "character":
          type = "classificationCharacter"
          break;
        case "category":
          type = "classificationCategory"
          break;
        case "product_type":
          type = "classificationProductType"
          break;
        default: break;
      }
      handleClose();
      dispatch(Actions.Filter.reload({ key: type }));
      
    });
  }

  return (
    <Fragment>
      <PopUpDialog
        title={
          <div className={classes.titleText}>
            {`Edit ${tabLabels[value]}`}
          </div>
        }
        content={
          <Fragment>
            <form onSubmit={handleCreate}>
              <ErrorMessage message={error?.message} map={messages} />
              <InputGroup
                className={classes.textField}
                fields={fields}
                onKeyPress={(ev) => {
                  if (ev.key === "Enter") {
                    handleCreate(ev);
                    ev.preventDefault();
                  }
                }}
              />
              {value === "character" && (
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
                    }}
                  >
                    <Typography className={classes.heading}>Add Icon</Typography>
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
              )}
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
                {`Edit ${tabLabels[value]}`}
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

export default EditClassification;