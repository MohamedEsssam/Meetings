import React from "react";
import { Formik } from "formik";

function FromContainer({
  innerRef,
  initialValues,
  validationSchema,
  onSubmit,
  children,
}) {
  return (
    <Formik
      innerRef={innerRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(values) => <div style={{ float: "right" }}>{children}</div>}
    </Formik>
  );
}

export default FromContainer;
