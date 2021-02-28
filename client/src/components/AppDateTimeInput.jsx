import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const AppDateTimeInput = ({ value, onChange, ...otherProps }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          {...otherProps}
          name={otherProps["name"]}
          minDate={new Date()}
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={value}
          onChange={onChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
        <KeyboardTimePicker
          {...otherProps}
          name={otherProps["name"]}
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={value}
          onChange={onChange}
          KeyboardButtonProps={{
            "aria-label": "change time",
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default AppDateTimeInput;
