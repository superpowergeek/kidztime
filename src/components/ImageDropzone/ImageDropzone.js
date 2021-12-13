import { CardMedia, colors, Link, Typography, CardActions, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import LoadingIndicator from "components/LoadingIndicator";
import PropTypes from "prop-types";
import React, { Fragment, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { RenderGuard } from "components";
import palette from "theme/palette";


const useStyles = makeStyles(theme => ({
  root: {},
  dropZone: {
    padding: theme.spacing(6),
    outline: "none",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
    "&:hover": {
      backgroundColor: colors.grey[50],
      opacity: 0.5,
      cursor: "pointer"
    }
  },
  dragActive: {
    backgroundColor: colors.grey[50],
    opacity: 0.5
  },
  image: {
    width: 130
  },
  info: {
    marginTop: theme.spacing(1)
  },
  list: {
    maxHeight: 320
  },
  actions: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-end",
    "& > * + *": {
      marginLeft: theme.spacing(2)
    }
  },
  error: {
    flex: 1
  },
  media: {
    height: 240,
  },
  loaderBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  actionRes: {
    padding: "16px 12px",
  },
  note: {
    color: palette.text.secondary,
    marginTop: 12,
  }
}));

const ImageDropzone = props => {
  const { className, types = [], error, setError, fileLoading, handleUpdate, image, updateLabel, mediaClass, loaderClass, purpose, ...rest } = props;
  const classes = useStyles();
  const [preview, setPreview] = useState(null);
  const mimes = ["image/jpeg", "image/png"];
  const [file, setFile] = useState(null);

  const handleDrop = useCallback(acceptedFile => {
    setFile(acceptedFile[0]);
    setPreview(URL.createObjectURL(acceptedFile[0]))
    setError(null);
    // eslint-disable-next-line
  }, []);

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop: handleDrop,
  });

  const clear = () => {
    if (purpose !== "form") {
      setPreview(null);
    }
    setFile(null);
  }

  const addPreview = (file) => {
    handleUpdate(file);
    clear();
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <input {...getInputProps()} accept={mimes} />
      {!image && !file && !fileLoading &&
        <div
          className={clsx({
            [classes.dropZone]: true,
            [classes.dragActive]: isDragActive
          })}
          {...getRootProps()}
        >
          <div>
            <img
              alt="Select"
              className={classes.image}
              src="/images/undraw_add_file2_gvbb.svg"
            />
          </div>
          <div>
            <Typography
              gutterBottom
              variant="h3"
            >
              Select Image
            </Typography>
            <Typography
              className={classes.info}
              color="textSecondary"
              variant="body1"
            >
              Drop image here or click to <Link underline="always">browse</Link>{" "}
              through your machine
            </Typography>
            <div className={classes.note}>Note: Please submit only <u>1</u> image.</div>
            {types && types.length > 0 && (
              <Typography
                className={classes.info}
                color="textSecondary"
                variant="body1"
              >
                Only {types.reduce((acc, val) => acc + val.format + ", ", "").slice(0, -2)} filetypes accepted
              </Typography>
            )}
          </div>
        </div>
      }
      <RenderGuard renderIf={fileLoading}>
        <div className={clsx(loaderClass, classes.loaderBox)}>
          <LoadingIndicator active={fileLoading} />
        </div>
      </RenderGuard>
      {(preview || image?.uri) && !fileLoading && <CardMedia
        className={mediaClass || classes.media}
        image={preview ? preview : image.uri}
      />
      }
      <CardActions className={classes.actionRes}>
        <RenderGuard renderIf={file}>
          <Fragment>
            <Button fullWidth className={classes.closeButton} onClick={clear} >Cancel</Button>
            <Button fullWidth className={classes.closeButton} onClick={() => addPreview(file)} >{updateLabel}</Button>
          </Fragment>
        </RenderGuard>
        <RenderGuard renderIf={image && !file}>
          <Button fullWidth className={classes.closeButton} onClick={open}>Change Image</Button>
        </RenderGuard>
      </CardActions>

    </div>
  );
};

ImageDropzone.propTypes = {
  className: PropTypes.string
};

ImageDropzone.defaultProps = {
  loaderClass: "",
  mediaClass: null,
  purpose: "upload",
};

export default ImageDropzone;
