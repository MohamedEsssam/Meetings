import React from "react";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput";
import AppSelectInput from "../AppSelectInput";
import FormErrorMessage from "./FormErrorMessage";

function FormField({
  name,
  inputType = "text",
  setField = () => {},
  ...otherProps
}) {
  const {
    touched,
    errors,
    setFieldTouched,
    setFieldValue,
    handleChange,
    values,
  } = useFormikContext();
  return (
    <>
      {inputType === "select" ? (
        <AppSelectInput
          {...otherProps}
          onBlur={() => setFieldTouched(name)}
          onChange={({ target }) => {
            setFieldValue(name, target["value"]);
            setField(target["value"]);
          }}
          value={values[name]}
        />
      ) : (
        <AppTextInput
          {...otherProps}
          onBlur={() => setFieldTouched(name)}
          onChange={handleChange(name)}
          value={values[name]}
        />
      )}
      <FormErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormField;
