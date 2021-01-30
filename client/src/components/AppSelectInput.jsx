import React from "react";
import { Field } from "formik";

const AppSelectInput = ({
  width = "30%",
  options = [],
  iconType,
  iconSize,
  ...otherProps
}) => {
  return (
    <div>
      {/* {iconType&&<AppIcons/>} */}
      <Field as="select" style={styles.input} {...otherProps}>
        <option selected disabled value={null}>
          اختر
        </option>
        {options.map((option) => {
          return <option value={option.value}>{option.text}</option>;
        })}
      </Field>
    </div>
  );
};

let styles = {
  container: {},
  input: {},
};

export default AppSelectInput;
