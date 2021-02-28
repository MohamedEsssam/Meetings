import React, { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Col, Row } from "react-bootstrap";
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

const AppPermissionForm = ({ setShow }) => {
  const onSubmit = async (values, { resetForm }) => {
    try {
      const permission = await permissionApi.create(values);
      setShow(false);
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
          <Row>
            <Col>
              <FormField name="unit" placeholder="أدخل اسم الوحدة" />
            </Col>
            <Col>
              <FormField name="representative" placeholder="أدخل اسم المندوب" />
            </Col>
          </Row>
          <Row>
            <Col>
              <FormField
                name="destination"
                placeholder="أدخل اسم الجهة الموجه لها"
              />
            </Col>
            <Col>
              <FormField name="notes" placeholder="أدخل الملاحظات" />
            </Col>
          </Row>
          <hr style={{ width: "50%" }} />
          <div style={{ position: "relative", left: "40%" }}>
            <SubmitButton title="تحويل لصورة" />
          </div>
        </>
      </FromContainer>
    </>
  );
};

export default AppPermissionForm;
