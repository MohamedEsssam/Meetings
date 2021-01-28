import React from "react";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput";
import FormErrorMessage from "./FormErrorMessage";

function FormField({ name, ...otherProps }) {
  const {
    touched,
    errors,
    setFieldTouched,
    handleChange,
    values,
  } = useFormikContext();
  return (
    <>
      <AppTextInput
        {...otherProps}
        onBlur={() => setFieldTouched(name)}
        onChange={handleChange(name)}
        value={values[name]}
      />
      <FormErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormField;
