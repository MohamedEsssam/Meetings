import React from "react";
import { Field } from "formik";

const AppSelectInput = ({
  width = "30%",
  options = [],
  title,
  iconType,
  iconSize,
  ...otherProps
}) => {
  return (
    <div>
      {/* {iconType&&<AppIcons/>} */}
      <Field as="select" style={styles.input} {...otherProps}>
        <option value="" disabled selected>
          {title}
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
  input: {
    width: "300px",
    height: "52px",
    textDecoration: "none",
    /*borderRadius:"20px",*/ outline: "none",
    position: "relative",
    top: "18px",
    left: "15px",
    marginBottom: "37px",
  },
};

export default AppSelectInput;
