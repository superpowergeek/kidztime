import React from "react";
import { makeStyles } from "@material-ui/core";
import useApi from "utils/api/useApi";
import { DropzoneStyles } from "utils/constants/styles";
import { useAsyncTask } from "utils/tools";
import { ErrorMessage, ImageDropzone, SectionPaper } from "components";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: 400,
  },
  cardtitle: {
    marginBottom: 14,
    fontSize: 16,
  },
  border: {
    height: "92%",
    display: "flex",
    alignItems: "center",
  },
  ...DropzoneStyles,
}));

const ImagePreview = (props) => {

  const { model, setModel } = props;

  const api = useApi();
  const classes = useStyles();

  const [runUpdate, load, error, setError] = useAsyncTask("account-update");

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
      const response = await api.path("product/preview/add", { product_id: model.id }).multipost({ body: formData });
      let image = response?.data?.result?.model;
      setModel({
        ...model,
        preview: image,
      });
    });
    return false;
  };

  return (
    <SectionPaper className={classes.root} title="Main Thumbnail">
      <ErrorMessage message={error?.message} map={messages} />
      <ImageDropzone
        image={model ? model.preview : null}
        error={error}
        setError={setError}
        handleUpdate={(file) => { addPreview(file); }}
        updateLabel="Confirm"
        className={classes.dropzone}
        mediaClass={clsx(classes.boxHeight, classes.media)}
        fileLoading={load}
        loaderClass={classes.boxHeight}
      />
    </SectionPaper>
  );
};

export default ImagePreview;