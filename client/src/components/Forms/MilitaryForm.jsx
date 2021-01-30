import React from "react";

import FormField from "./FormField";

const MilitaryForm = () => {
  return (
    <>
      <FormField name="militaryRank" placeholder="ادخل الرتبة" />
      <FormField name="job" placeholder="ادخل الوظيفة" />
      <FormField name="unit" placeholder="ادخل الوحدة" />
      <FormField name="army" placeholder="ادخل الشركة/الهيئة" />
    </>
  );
};

export default MilitaryForm;
