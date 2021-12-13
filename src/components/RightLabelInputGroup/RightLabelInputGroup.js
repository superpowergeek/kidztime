import "date-fns";
import DateFnsUtils from '@date-io/date-fns';
import { Grid, MenuItem, TextField, makeStyles, Typography, Switch } from "@material-ui/core";
import { PasswordField } from "components";
import Loader from "components/Loader";
import React, { Fragment } from "react";
import { pascalize } from "utils/formatting";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  textField: {
    width: "70%"
  },
  label: {
    flex: 1,
    textAlign: "right",
    paddingRight: theme.spacing(3)
  }
}));

const InputSwitch = (props) => {
 
  const { field, index, className, selectProps, loading, ...rest } = props;

  switch (field.spec.type) {
    case "select":
      const options = Object.values(field.options) || [];
      return <TextField
        disabled={field.disabled || loading}
        key={index}
        value={field.value}
        className={className}
        SelectProps={selectProps}
        onChange={field.onChange}
        onBlur={field.onBlur}
        variant="outlined"
        error={field.dirty && !!field.error}
        helperText={field.dirty && field.error}
        placeholder={field.spec.placeholder}
        select
        InputLabelProps={{ shrink: false }}
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
      </TextField>;
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
        InputLabelProps={{ shrink: false }}
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
        error={field.dirty && !!field.error}
        helperText={field.dirty && field.error}
        placeholder={field.spec.placeholder}
        InputLabelProps={{ shrink: false }}
        {...rest} />;
    case "date":
      return <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          className={className}
          inputVariant="outlined"
          format="dd/MM/yyyy"
          value={field.value}
          onChange={value => field.onChange({ target: { value }})}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          InputLabelProps={{ shrink: false }}
          {...rest} />
      </MuiPickersUtilsProvider>;
    case "switch":
      return <Grid
        className={className}>
          <Switch
            value={field.value}
            onChange={event => field.onChange({ target: {value: event.target.checked }})}
          />
        </Grid>;
    default:
      return <TextField
        className={className}
        fullWidth
        disabled={field.disabled}
        key={index}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        variant="outlined"
        type={field.spec.type}
        error={field.dirty && !!field.error}
        helperText={field.dirty && field.error}
        placeholder={field.spec.placeholder}
        InputLabelProps={{ shrink: false }}
        {...rest} />;
  }
};

const RightLabelInputGroup = (props) => {
  const classes = useStyles();
  const { className, selectProps, fields, loading, ...rest } = props;

  return (
    <Fragment>
      <Grid container spacing={1}>
        {
          fields.map((field, index) =>
            <Grid item xs={12} sm={field.width} key={index} className={classes.inputContainer}>
              <Typography className={classes.label}>
                {field.spec.label}
              </Typography>
              <InputSwitch
                className={classes.textField}
                loading={loading}
                field={field}
                index={index}
                selectProps={selectProps}
                {...rest} />
            </Grid>
          )
        }
      </Grid>
    </Fragment>
  );
};

RightLabelInputGroup.defaultProps = {
  selectProps: {}
};

export default RightLabelInputGroup;