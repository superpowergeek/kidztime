import { Button, makeStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import clsx from "clsx";
import { DeleteDialog, InputGroup, PopUpDialog } from "components";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "store";
import useApi from "utils/api/useApi";
import { ButtonProps, ButtonStyles } from "utils/constants";
import { DialogStyles, DropzoneStyles } from "utils/constants/styles";
import useFormHandler from "utils/forms/useFormHandler";
import { formStructure } from "./editElementConfig";
import { productFeatureFormStructure, categoryFeatureFormStructure, productListingFormStructure } from "./elementOptionConfig";

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
    marginTop: theme.spacing(2),
    width: "100%",
  },
  details: {
    padding: "8px 0px 16px",
  },
  imageZone: {
    marginTop: theme.spacing(2)
  },
  delete: {
    marginTop: theme.spacing(2),
    ...ButtonStyles.DELETE.style,
    padding: theme.spacing(1, 2),
  },
}));

const EditWebpageElement = (props) => {
  const { open, handleClose, model: parent } = props;
  const api = useApi();
  const classes = useStyles();
  const [remove, setRemove] = useState(false);
  const [mainFormStructure, setMainFormStructure] = useState(formStructure);

  Object.keys(parent?.options || {}).map((key) => {
    return parent[key] = parent?.options[key];
  });
  delete parent?.options;
  
  useEffect(()=> {
    switch (parent.type) {
      case "product-feature":
        setMainFormStructure({ ...formStructure, ...productFeatureFormStructure });
        break;
      case "category-feature":
        setMainFormStructure({ ...formStructure, ...categoryFeatureFormStructure });
        break;
      case "product-listing":
        setMainFormStructure({ ...formStructure, ...productListingFormStructure });
        break;
      case "review-slider":
        setMainFormStructure({ ...formStructure });
        break;
      default:
        setMainFormStructure(formStructure);
        break;
    }
  }, [parent.type]);

  const [fields, values, errors, setValues, setErrors, setDirtys] = useFormHandler(mainFormStructure, parent); // eslint-disable-line
  const dispatch = useDispatch();
 
  const del = () => {
    if (parent.id) {
      return api.path("frontend/webpage/element/delete", { element_id: parent.id }).del();
    }
  };

  const handleDel = () => {
    setRemove(false);
    dispatch(Actions.Filter.reload({ key: "pageElements" }));
  }

  return (
    <Fragment>
      <PopUpDialog
        title={
          <div className={classes.titleText}>
            Edit Page Element
          </div>
        }
        content={
          <Fragment>
            <form>
              <InputGroup
                className={classes.textField}
                fields={fields}
              />
              <Button
                className={classes.delete}
                {...ButtonProps}
                startIcon={<DeleteIcon />}
                onClick={() => setRemove(true)}
              >
                Delete Element
              </Button>
            </form>
          </Fragment>
        }
        open={open}
        handleClose={handleClose}
        titleClass={classes.title}
        contentClass={clsx(classes.content, classes.addContent)}
        className={classes.root}
      />
      <DeleteDialog
        name="Element"
        del={del}
        open={remove}
        handleDelete={() => handleDel() }
        handleClose={() => setRemove(false)}
      />
    </Fragment>
  )
};

export default EditWebpageElement;