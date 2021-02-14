import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const AppAutoComplete = ({ options = [], getOptionLabel, ...otherProps }) => {
  return (
    <div style={{ padding: "10px", margin: "5px" }}>
      <Autocomplete
        options={options}
        style={{ width: 300 }}
        debug
        // getOptionLabel={getOptionLabel}
        // renderOption={(option) => option.text}
        defaultValue={otherProps.value}
        renderInput={(params) => (
          <TextField
            {...otherProps}
            {...params}
            defaultValue={otherProps.value}
            label={otherProps.label}
            variant="outlined"
          />
        )}
      />
    </div>
  );
};

export default AppAutoComplete;
