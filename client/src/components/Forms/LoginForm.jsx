import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import userApi from "../../services/UserServices";
import { useAuth } from "../../context/auth";

import FromContainer from "./FormContainer";
import FormField from "./FormField";
import SubmitButton from "./SubmitButton";
import FormErrorMessage from "./FormErrorMessage";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("يجب عليك ادخال اسم المستخدم")
    .label("username"),
  password: Yup.string()
    .required("يجب عليك ادخال كلمة السر")
    .min(3)
    .label("Password"),
});

function AppLoginForm(props) {
  const { setUser } = useAuth();
  const history = useHistory();
  const [loginFailed, setLoginFailed] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (values) => {
    try {
      const user = await userApi.login(values);
      setLoginFailed(false);
      setUser(user);
      toast.success("تم تسجيل الدخول بنجاح");

      switch (user["roleType"]) {
        case "Admin":
          history.push(`/admin`);
          break;
        case "Commender":
          history.push(`/?departmentId=${user["departmentId"]}`);
          break;
        case "ChiefCommander":
          history.push(`/?departmentId=${user["departmentId"]}`);
          break;
        case "Inquiries":
          history.push(`/inquires`);
          break;
        case "PoliceArmy":
          history.push(`/myMeetings`);
          break;
        default:
          break;
      }
    } catch (error) {
      setError("أسم المستخدم او كلمة السر خاطئة");
      toast.error("أسم المستخدم او كلمة السر خاطئة");
      return setLoginFailed(true);
    }
  };

  return (
    <>
      <FromContainer
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <>
          <FormErrorMessage error={error} visible={loginFailed} />
          <FormField name="username" placeholder="أدخل اسم المستخدم" />
          <FormField
            name="password"
            placeholder="أدخل كلمة السر"
            type="password"
          />
          <SubmitButton title="دخول" />
        </>
      </FromContainer>
    </>
  );
}

export default AppLoginForm;
