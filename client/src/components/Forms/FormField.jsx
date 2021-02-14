import React from "react";
import { useFormikContext } from "formik";
// GrUserWorker

import AppTextInput from "../AppTextInput";
import AppSelectInput from "../AppSelectInput";
import FormErrorMessage from "./FormErrorMessage";
import AppAutoComplete from "../AppAutoComplete";

function FormField({
  name,
  inputType = "text",
  setField = () => {},
  map,
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

  setField(values[name]);
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
      ) : inputType === "autoComplete" ? (
        <AppAutoComplete
          {...otherProps}
          onBlur={() => setFieldTouched(name)}
          onChange={({ target }) => {
            setFieldValue(
              name,
              map
                ? map.get(target["value"])
                  ? map.get(target["value"])
                  : target["value"]
                : target["value"]
            );
          }}
          value={values[name]}
          onSelect={({ target }) => {
            setFieldValue(
              name,
              map
                ? map.get(target["value"])
                  ? map.get(target["value"])
                  : target["value"]
                : target["value"]
            );
          }}
          getOptionLabel={(option) => option.text}
        />
      ) : (
        <AppTextInput
          {...otherProps}
          onBlur={() => setFieldTouched(name)}
          onChange={handleChange(name)}
          value={values[name]}
        />
      )}
      <div style={{ position: "relative", left: "50px" }}>
        <FormErrorMessage error={errors[name]} visible={touched[name]} />
      </div>
    </>
  );
}

export default FormField;
