import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, Button } from "@material-ui/core";
import { ErrorMessage, InputGroup } from "components";
import { submitButton } from "utils/constants/styles"

const useStyles = makeStyles(theme => ({
  textField: {
    margin: "2px 0px",
    width: "100%",
  },
  submitButton: submitButton,
}))

const FormBlock = (props) => {

  const { className, handleSubmit, error, messages, fields, errors, loading, buttonTitle, errorClass, ...rest } = props;

  const classes = useStyles();

  return (
    <form
      {...rest}
      className={clsx(className, classes.root)}
      onSubmit={handleSubmit}
    >
      <ErrorMessage message={error?.message} map={messages} className={errorClass} />
      <InputGroup 
        className={classes.textField} 
        fields={fields} 
        onKeyPress={(ev) => {
          if (ev.key === "Enter") {
            handleSubmit(ev);
            ev.preventDefault();
          }
        }} />
      <Button
        variant="contained"
        size="large"
        className={classes.submitButton}
        disabled={loading}
        type="submit"
        color="secondary">
          { buttonTitle }
      </Button>
    </form>
  );
};

FormBlock.propTypes = {
  className: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.any,
  messages: PropTypes.object,
  fields: PropTypes.array.isRequired,
  errors: PropTypes.any,
  loading: PropTypes.bool.isRequired,
  buttonTitle: PropTypes.string.isRequired,
};

FormBlock.defaultProps = {
  className: "",
  errorClass: "",
};

export default FormBlock;