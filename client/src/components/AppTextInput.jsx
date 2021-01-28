import React from "react";
import { Field } from "formik";

const AppTextInput = ({ width = "30%", iconType, iconSize, ...otherProps }) => {
  return (
    <div>
      {/* {iconType&&<AppIcons/>} */}
      <Field style={styles.input} {...otherProps} />
    </div>
  );
};

let styles = {
  container: {},
  input: {},
};

export default AppTextInput;
