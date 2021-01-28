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
  username: Yup.string().required("يجب عليك ادخال اسم المستخدم").label("Email"),
  password: Yup.string()
    .required("يجب عليك ادخال كلمة السر")
    .min(3)
    .label("Password"),
  // confirmPassword: Yup.string()
  // .oneOf([Yup.ref("password"), null], "Passwords do not match")
  // .required("Password confirmation required"),
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
      history.push("/");
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
