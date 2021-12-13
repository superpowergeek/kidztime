import "date-fns";
import DateFnsUtils from '@date-io/date-fns';
import { Grid, MenuItem, TextField } from "@material-ui/core";
import { PasswordField } from "components";
import Loader from "components/Loader";
import React, { Fragment } from "react";
import { pascalize } from "utils/formatting";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const InputSwitch = (props) => {

  const { field, index, className, selectProps, loading, ...rest } = props;

  switch (field.spec.type) {
    case "select":

      const options = Object.values(field.options) || [];

      return (
        <TextField
          disabled={field.disabled || loading}
          key={index}
          value={field.value}
          className={className}
          SelectProps={selectProps}
          onChange={field.onChange}
          onBlur={field.onBlur}
          variant="outlined"
          label={field.spec.label}
          error={field.dirty && !!field.error}
          helperText={field.dirty && field.error}
          placeholder={field.spec.placeholder}
          select
        >
          {
            options.map((each, id) => {
              if (typeof each === "string") {
                return (
                  <MenuItem value={each} key={id}>
                    {pascalize(each)}
                    <Loader loading={loading} thickness={4} size={12} padding={0} />
                  </MenuItem>
                );
              } else {
                return (
                  <MenuItem value={each.value} key={id}>
                    {each.node}
                    <Loader loading={loading} thickness={4} size={12} padding={0} />
                  </MenuItem>
                );
              }
            })
          }
        </TextField>
      );
    case "textarea":
      return <TextField
        fullWidth
        disabled={field.disabled}
        key={index}
        value={field.value}
        className={className}
        onChange={field.onChange}
        onBlur={field.onBlur}
        variant="outlined"
        type={field.spec.type}
        label={field.spec.label}
        error={field.dirty && !!field.error}
        helperText={field.dirty && field.error}
        placeholder={field.spec.placeholder}
        multiline
        rowsMax={4}
        {...rest}
      />;
    case "password":
      return <PasswordField
        disabled={field.disabled}
        key={index}
        value={field.value}
        className={className}
        onChange={field.onChange}
        onBlur={field.onBlur}
        label={field.spec.label}
        error={field.dirty && !!field.error}
        helperText={field.dirty && field.error}
        placeholder={field.spec.placeholder}
        {...rest} />;
    case "date":
      return <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            className={className}
            inputVariant="outlined"
            format="dd/MM/yyyy"
            label={field.spec.label}
            value={field.value}
            onChange={field.onChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            {...rest} />
      </MuiPickersUtilsProvider>; 
      
    default:
      return <TextField
        fullWidth
        disabled={field.disabled}
        key={index}
        value={field.value}
        className={className}
        onChange={field.onChange}
        onBlur={field.onBlur}
        variant="outlined"
        type={field.spec.type}
        label={field.spec.label}
        error={field.dirty && !!field.error}
        helperText={field.dirty && field.error}
        placeholder={field.spec.placeholder}
        {...rest} />;
  }
};

const InputGroup = (props) => {
  const { className, selectProps, fields, loading, ...rest } = props;

  return (
    <Fragment>
      <Grid container spacing={1}>
        {
          fields.map((field, index) =>
            <Grid item xs={12} sm={field.width} key={index}>
              <InputSwitch
                loading={loading}
                field={field}
                index={index}
                className={className}
                selectProps={selectProps}
                {...rest} />
            </Grid>
          )
        }
      </Grid>
    </Fragment>
  );
};

InputGroup.defaultProps = {
  selectProps: {}
};

export default InputGroup;