import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Col, Row } from "react-bootstrap";
import * as Yup from "yup";
import userApi from "../../services/UserServices";
import roleApi from "../../services/roleServices";
import departmentApi from "../../services/departmentServices";
import { rolesMap } from "../../utils/Map";

import FromContainer from "./FormContainer";
import FormField from "./FormField";
import SubmitButton from "./SubmitButton";
import FormErrorMessage from "./FormErrorMessage";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("يجب عليك ادخال اسم المستخدم")
    .label("Username"),
  name: Yup.string()
    .required("يجب عليك ادخال اسم الحقيقي للمستخدم")
    .label("Name"),
  militaryRank: Yup.string()
    .required("يجب عليك ادخال رتبة المستخدم")
    .label("militaryRank"),
  job: Yup.string().required("يجب عليك ادخال وظيفة المستخدم").label("Job"),
  unit: Yup.string().required("يجب عليك ادخال وحدة المستخدم").label("Unit"),
  army: Yup.string().required("يجب عليك ادخال جيش المستخدم").label("Army"),
  roleId: Yup.string()
    .required("يجب عليك ادخال صلاحيات المستخدم")
    .label("RoleId"),
  departmentName: Yup.string()
    .required("يجب عليك ادخال قسم المستخدم")
    .label("DepartmentName"),
  password: Yup.string()
    .required("يجب عليك ادخال كلمة السر")
    .min(3, "كلمة السر يجب ان تكون اكثر من 3 حروف او ارقام")
    .label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "كلمة السر غير متطابقة")
    .required("يجب عليك اعادة كتابة كلمة السر"),
});

function AppRegisterForm({ show, setShow }) {
  const [RegisterFailed, setRegisterFailed] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [administrator, setAdministrator] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadRoles();
    loadDepartment();
  }, []);

  const loadRoles = async () => {
    const items = [];
    const roles = await roleApi.getAll();
    roles.map((role) => {
      items.push(rolesMap.get(role["roleType"]));

      roleMap.set(rolesMap.get(role["roleType"]), role["roleId"]);
    });

    setRoles(items);
  };

  const loadDepartment = async () => {
    const items = [];
    const departments = await departmentApi.getAll();
    departments.map((department) => {
      items.push(department["departmentName"]);
    });

    setDepartments(items);
  };

  const filterArrya = (arr) => {
    let ids = arr.map((o) => o.id);

    return arr.filter(({ id }, index) => !ids.includes(id, index + 1));
  };

  const onSubmit = async (values, { resetForm }) => {
    try {
      await userApi.register(values);
      setRegisterFailed(false);
      resetForm();
      setShow(false);
      toast.success("تم تسجيل المستخدم بنجاح");
    } catch (error) {
      setError("هذا الشخص تم تسجيله من قبل يرجي تغير اسم المستخدم");
      toast.error("هذا الشخص تم تسجيله من قبل يرجي تغير اسم المستخدم");
      return setRegisterFailed(true);
    }
  };

  return (
    <>
      <FromContainer
        initialValues={{
          username: "",
          name: "",
          militaryRank: "",
          job: "",
          army: "",
          unit: "",
          roleId: "",
          departmentName: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <>
          <FormErrorMessage error={error} visible={RegisterFailed} />
          <Row>
            <Col>
              <FormField name="name" placeholder="أدخل اسم الحقيقي المستخدم" />
            </Col>
            <Col>
              <FormField
                name="militaryRank"
                options={militaryRanks}
                inputType="autoComplete"
                label="أدخل رتبة المستخدم"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <FormField
                options={jobs}
                inputType="autoComplete"
                name="job"
                label="أدخل وظيفة المستخدم"
              />
            </Col>
            <Col>
              <FormField
                options={unit}
                inputType="autoComplete"
                name="unit"
                label="أدخل وحدة المستخدم"
              />
            </Col>
            <Col>
              <FormField
                options={army}
                inputType="autoComplete"
                name="army"
                label="أدخل جيش المستخدم"
              />
            </Col>
            <Col>
              <FormField
                options={departments}
                inputType="autoComplete"
                name="departmentName"
                label="أدخل قسم المستخدم"
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <FormField
                map={roleMap}
                options={roles}
                inputType="autoComplete"
                name="roleId"
                label="أدخل صلاحيات المستخدم"
              />
            </Col>
            <Col>
              <FormField name="username" placeholder="أدخل اسم المستخدم" />
            </Col>
          </Row>

          <Row>
            <Col>
              <FormField
                name="confirmPassword"
                placeholder="اعد كتابة كلمة السر"
                type="password"
              />
            </Col>
            <Col>
              <FormField
                name="password"
                placeholder="أدخل كلمة السر"
                type="password"
              />
            </Col>
          </Row>

          <hr style={{ width: "400px" }} />
          <div style={{ position: "relative", left: "40%" }}>
            <SubmitButton title="تسجيل المستخدم" />
          </div>
        </>
      </FromContainer>
    </>
  );
}

const militaryRanks = [
  "فريق",
  "لواء",
  "عميد",
  "عقيد",
  "مقدم",
  "رائد",
  "نقيب",
  "ملازم اول",
  "ملازم",
  "مساعد اول",
  "مساعد",
  "رقيب اول",
  "رقيب",
  "عريف",
];

const jobs = [
  "رئيس فرع الامن",
  "نائب رئيس الفرع",
  "سكرتارية رئيس فرع الامن",
  "رئيس قسم الجزاءات",
  "رئيس قسم الافراد",
  "رئيس قسم الشركات",
  "رئيس قسم المنشأت",
  "رئيس قسم الادارة المحلية",
  "الاستعلامات",
];

const army = [
  "القوات البحرية",
  "الجيش الاول",
  "جيش التاني",
  "الجيش التالت",
  "المنطقة الشمالية",
];

const unit = ["فرع الامن", "فرع النظم"];

const departmentMap = new Map();
const roleMap = new Map();

export default AppRegisterForm;
