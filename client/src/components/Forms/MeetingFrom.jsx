import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAuth } from "../../context/auth";

import FromContainer from "./FormContainer";
import FormField from "./FormField";
import MilitaryForm from "./MilitaryForm";
import CivilForm from "./CivilForm";
import SubmitButton from "./SubmitButton";

const validationSchema = Yup.object().shape({
  personName: Yup.string()
    .required("يجب عليك ادخال اسم المستخدم")
    .label("PersonName"),
  personType: Yup.string()
    .required("يجب عليك ادخال كلمة نوع الزائر")
    .label("PersonType")
    .nullable(),
  job: Yup.string().required("يجب ادخال وظيفة الزائر").label("Job"),
  militaryRank: Yup.string()
    .when("personType", {
      is: "Military",
      then: Yup.string().required("يجب عليك ادخال رتبة الزائر"),
    })
    .label("MilitaryRank"),
  unit: Yup.string()
    .when("personType", {
      is: "Military",
      then: Yup.string().required("يجب عليك ادخال وحدة الزائر"),
    })
    .label("Unit"),
  army: Yup.string()
    .when("personType", {
      is: "Military",
      then: Yup.string().required("يجب عليك ادخال جيش الزائر"),
    })
    .label("Army"),
  administrator: Yup.string()
    .required("يجب عليك ادخال اسم الشخص الذي يريد مقابلته")
    .label("Administrator"),
  departmentId: Yup.string()
    .required("يجب عليك ادخال اسم الفرع")
    .label("DepartmentId"),
});

function AppMeetingForm({ initialValues }) {
  const ref = useRef(null);
  const { setUser } = useAuth();
  const [personType, setPersonType] = useState("Military");

  const onSubmit = async (values) => {
    console.log(values);
  };

  return (
    <>
      <FromContainer
        innerRef={ref}
        initialValues={
          initialValues
            ? initialValues
            : {
                personName: "",
                personType: null,
                job: "",
                militaryRank: "",
                unit: "",
                army: "",
                administrator: "",
                departmentId: "",
              }
        }
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <FormField name="personName" placeholder="أدخل اسم الزائر" />
        <FormField
          options={[
            { text: "مدني", value: "Civil" },
            { text: "عسكري", value: "Military" },
          ]}
          inputType="select"
          name="personType"
          setField={setPersonType}
        />

        {personType === "Civil" ? <CivilForm /> : <MilitaryForm />}

        <FormField inputType="select" name="departmentId" />
        <FormField inputType="select" name="administrator" />

        <SubmitButton title="انشاء اجتماع" />
      </FromContainer>
    </>
  );
}

export default AppMeetingForm;
