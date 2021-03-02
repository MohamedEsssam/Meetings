import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { Col, Row } from "react-bootstrap";
import * as Yup from "yup";
import { useAuth } from "../../context/auth";
import meetingApi from "../../services/MeetingServices";
import userApi from "../../services/UserServices";
import departmentApi from "../../services/departmentServices";

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
    .required("يجب عليك ادخال نوع الزائر")
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
    .required("يجب عليك ادخال جيش /شركة/هيئة الزائر")
    .label("Army"),
  administrator: Yup.string()
    .required("يجب عليك ادخال اسم الشخص الذي يريد مقابلته")
    .label("Administrator"),
  departmentName: Yup.string()
    .required("يجب عليك ادخال اسم الفرع")
    .label("DepartmentName"),
});

function AppMeetingForm({
  initialValues,
  setShow,
  type = "create",
  meetingId = null,
}) {
  const ref = useRef(null);
  const { setUser } = useAuth();
  const [personType, setPersonType] = useState("Military");
  const [departmentName, setDepartmentName] = useState("");
  const [administrators, setAdministrators] = useState();
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    loadDepartment();
    onDepartmentChange();
  }, [departmentName]);

  const filterUsers = (arr) => {
    let ids = arr.map((o) => o.userId);

    return arr.filter(({ userId }, index) => !ids.includes(userId, index + 1));
  };

  const onDepartmentChange = async () => {
    const administrators = await userApi.getAll(departmentName);
    const uniqueadministrators = filterUsers(administrators).map(
      ({ name }) => name
    );

    setAdministrators(uniqueadministrators);
  };

  const loadDepartment = async () => {
    const items = [];
    const departments = await departmentApi.getAll();
    departments.map((department) => {
      items.push(department["departmentName"]);
    });

    setDepartments(items);
  };

  const onSubmit = async (values, { resetForm }) => {
    try {
      switch (type) {
        case "create":
          await meetingApi.create(values);
          resetForm();
          toast.success("تم انشاء الاجتماع بنجاح");
          setShow(false);
          break;

        case "update":
          await meetingApi.update(meetingId, values);
          toast.success("تم تعديل الاجتماع بنجاح");
          setShow(false);
          break;

        default:
          break;
      }
    } catch (error) {
      toast.error("لقد حدث خطأ في انشاء الاجتماع");
    }
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
                departmentName: "",
              }
        }
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Row>
          <Col>
            <FormField name="personName" label="أدخل اسم الزائر" />
          </Col>
          <Col>
            <FormField
              title=" (عسكري / مدني) اختر"
              options={[
                { text: "مدني", value: "Civil" },
                { text: "عسكري", value: "Military" },
              ]}
              inputType="select"
              name="personType"
              setField={setPersonType}
            />
          </Col>
        </Row>
        {personType === "Civil" ? <CivilForm /> : <MilitaryForm />}
        <Row>
          <Col>
            <FormField
              options={administrators}
              inputType="autoComplete"
              name="administrator"
              label="اختر الشخص الذي تريد ان تقابله"
            />
          </Col>
          <Col>
            <FormField
              options={departments}
              inputType="autoComplete"
              name="departmentName"
              label="أدخل قسم المستخدم"
              onChange={onDepartmentChange}
              setField={setDepartmentName}
            />
          </Col>
        </Row>

        <hr style={{ width: "300px" }} />
        <div style={{ position: "relative", left: "40%" }}>
          <SubmitButton
            title={type === "update" ? "تعديل الاجتماع " : "أنشاء الاجتماع"}
          />
        </div>
      </FromContainer>
    </>
  );
}

export default AppMeetingForm;
