import React from "react";
import { Field } from "formik";
import TextField from "@material-ui/core/TextField";

const AppTextInput = ({ width = "30%", iconType, iconSize, ...otherProps }) => {
  return (
    <div>
      {/* {iconType&&<AppIcons/>} */}
      <TextField style={styles.input} {...otherProps} variant="outlined" />
    </div>
  );
};

let styles = {
  container: {},
  input: {
    width: "317px",
    right: "10px",
    color: "#707070",
    padding: "10px",
    margin: "17px",
    outline: "none",
    textAlign: "center",
    justifyContent: "center",
    itemAlign: "center",
  },
};

export default AppTextInput;
