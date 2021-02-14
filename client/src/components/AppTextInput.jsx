import React from "react";
import { Field } from "formik";
import TextField from "@material-ui/core/TextField";

const AppTextInput = ({ width = "30%", iconType, iconSize, ...otherProps }) => {
  return (
    <div>
      {/* {iconType&&<AppIcons/>} */}
      <TextField style={styles.input} {...otherProps} />
    </div>
  );
};

let styles = {
  container: {},
  input: {
    width: "300px",
    border: "1px solid #c8c8c8",
    color: "#707070",
    padding: "10px",
    margin: "17px",
    outline: "none",
  },
};

export default AppTextInput;
