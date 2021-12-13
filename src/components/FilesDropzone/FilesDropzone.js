import { Button, colors, Link, List, ListItem, ListItemIcon, ListItemText, Typography } from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import ErrorMessage from "components/ErrorMessage";
import LoadingIndicator from "components/LoadingIndicator";
import PropTypes from "prop-types";
import React, { Fragment, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import PerfectScrollbar from "react-perfect-scrollbar";
import { bytesToSize } from "utils/formatting";
import uuid from "uuid/v1";
import { MoreButton } from "./components";


const useStyles = makeStyles(theme => ({
  root: {},
  dropZone: {
    border: `1px dashed ${theme.palette.divider}`,
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
  }
}));

const FilesDropzone = props => {
  const { className, multiple, files, setFiles, types = [], error, setError, handleUpload, fileLoading, message, ...rest } = props;

  const classes = useStyles();

  const handleDrop = useCallback(acceptedFiles => {
    setFiles(files => [...files].concat(acceptedFiles));
    setError(null);
    // eslint-disable-next-line
  }, []);

  const handleRemoveAll = () => {
    setFiles([]);
  };

  const mimes = types.map((type) => type.mime);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    multiple
  });

  const moreOptions = {
    handleDelete: (index) => {
      let newFiles = [...files];
      newFiles.splice(index, 1)
      setFiles(newFiles);
    }
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      {(multiple || !files.length) && !fileLoading &&

        <div
          className={clsx({
            [classes.dropZone]: true,
            [classes.dragActive]: isDragActive
          })}
          {...getRootProps()}
        >
          <input {...getInputProps()} accept={mimes} />
          <div>
            <img
              alt="Select file"
              className={classes.image}
              src="/images/undraw_add_file2_gvbb.svg"
            />
          </div>
          <div>
            <Typography
              gutterBottom
              variant="h3"
            >
              {multiple ? "Select files" : "Select file"}
            </Typography>
            <Typography
              className={classes.info}
              color="textSecondary"
              variant="body1"
            >
              Drop {multiple ? "files" : "file"} here or click to <Link underline="always">browse</Link>{" "}
              through your machine
            </Typography>
            <Typography
              className={classes.info}
              color="textSecondary"
              variant="body1"
            >
              {message}
            </Typography>
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
      <LoadingIndicator active={fileLoading} variant="card" />
      {files.length > 0 && (
        <Fragment>
          <PerfectScrollbar options={{ suppressScrollX: true }}>
            <List className={classes.list}>
              {files.map((file, i) => (
                <ListItem
                  divider={i < files.length - 1}
                  key={uuid()}
                >
                  <ListItemIcon>
                    <FileCopyIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={file.name}
                    primaryTypographyProps={{ variant: "h5" }}
                    secondary={bytesToSize(file.size)}
                  />
                  <MoreButton options={moreOptions} fileIndex={i} />
                </ListItem>
              ))}
            </List>
          </PerfectScrollbar>
          <div className={classes.actions}>
            <div className={classes.error}>
              {error && <ErrorMessage message={error} />}
            </div>
            <Button
              onClick={handleRemoveAll}
              size="small"
            >
              Remove{multiple && " all"}
            </Button>
            <Button
              color="secondary"
              size="small"
              variant="contained"
              onClick={handleUpload}
            >
              Upload files
            </Button>
          </div>
        </Fragment>
      )}
    </div>
  );
};

FilesDropzone.propTypes = {
  className: PropTypes.string
};

export default FilesDropzone;
