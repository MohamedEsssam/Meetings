import React from "react";

import FormField from "./FormField";

const CivilForm = () => {
  return (
    <>
      <FormField name="job" placeholder="ادخل الوظيفة" />
      <FormField name="army" placeholder="ادخل الشركة/الهيئة" />
    </>
  );
};

export default CivilForm;
