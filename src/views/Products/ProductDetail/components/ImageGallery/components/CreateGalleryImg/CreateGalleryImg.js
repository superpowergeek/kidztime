import React, { Fragment } from "react";
import { ErrorMessage, ImageDropzone, PopUpDialog } from "components";
import { makeStyles } from "@material-ui/core";
import useApi from "utils/api/useApi";
import { DialogStyles, DropzoneStyles } from "utils/constants/styles";
import { useAsyncTask } from "utils/tools";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  root: {},
  ...DialogStyles,
  ...DropzoneStyles,
}));

const CreateGalleryImg = (props) => {

  const { open, handleClose, model, setModel } = props;

  const classes = useStyles();
  const api = useApi();

  const [runUpdate, load, error, setError] = useAsyncTask("create-gallery-image");

  const messages = {
    "file not found:image": "The file you've uploaded cannot be found. Please check that the file exists or contact the support staff.",
    "file not image": "Oops, it seems your file is not an image. Please submit an image."
  }

  const addPreview = (file) => {
    runUpdate(async () => {
      if (!file) throw new Error("file not found:image");
      if (!file.type.match(/image.*/)) throw new Error("file not image");

      const formData = new FormData();
      formData.append("image", file);
      const response = await api.path("product/gallery/add", { product_id: model.id }).multipost({ body: formData });
      let image = response?.data?.result?.model;
      setModel({
        ...model,
        images: model.images.concat([image]),
      });
      handleClose();
    });
    return false;
  };

  return (
    <Fragment>
      <PopUpDialog
        title={
          <div className={classes.titleText}>
            Add Gallery Image
          </div>
        }
        content={
          <Fragment>
            <ErrorMessage message={error?.message} map={messages} />
            <ImageDropzone
              image={null}
              error={error}
              setError={setError}
              handleUpdate={(file) => { addPreview(file); }}
              updateLabel="Confirm"
              className={classes.dropzone}
              mediaClass={clsx(classes.boxHeight, classes.media)}
              fileLoading={load}
              loaderClass={classes.boxHeight}
            />
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

export default CreateGalleryImg;