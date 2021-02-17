import React, { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAuth } from "../../context/auth";
import permissionApi from "../../services/permissionServices";

import FromContainer from "./FormContainer";
import FormField from "./FormField";
import SubmitButton from "./SubmitButton";

const validationSchema = Yup.object().shape({
  unit: Yup.string().required("يجب عليك ادخال وحدة").label("unit"),
  representative: Yup.string()
    .required("يجب عليك ادخال اسم المندوب")
    .label("representative"),
  destination: Yup.string()
    .required("يجب عليك ادخال الجهة الموجه لها")
    .label("destination"),
});

const AppPermissionForm = () => {
  const onSubmit = async (values, { resetForm }) => {
    try {
      const permission = await permissionApi.create(values);
      toast.success("لقد تم تسجيل اذن الاخراج");
    } catch (error) {
      toast.error("لقد حدث خطأ في التحويل لصورة");
    }
  };
  return (
    <>
      <FromContainer
        initialValues={{
          unit: "",
          representative: "",
          destination: "",
          notes: "",
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <>
          <FormField name="unit" placeholder="أدخل اسم الوحدة" />
          <FormField name="representative" placeholder="أدخل اسم المندوب" />
          <FormField
            name="destination"
            placeholder="أدخل اسم الجهة الموجه لها"
          />
          <FormField name="notes" placeholder="أدخل الملاحظات" />
          <SubmitButton title="تحويل لصورة" />
        </>
      </FromContainer>
    </>
  );
};

export default AppPermissionForm;
