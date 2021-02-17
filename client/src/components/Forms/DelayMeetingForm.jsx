import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import moment from "moment";
import meetingApi from "../../services/MeetingServices";

import FromContainer from "./FormContainer";
import FormField from "./FormField";
import SubmitButton from "./SubmitButton";

const validationSchema = Yup.object().shape({
  startDate: Yup.string().required("يجب عليك ادخال معاد التأجيل"),
});
function DelayMeetingForm({ meeting, setShow }) {
  const onSubmit = async (values) => {
    try {
      values["delayDate"] = moment(values["delayDate"]).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      meeting["status"] = "Delayed";
      await meetingApi.update(meeting["meetingId"], { ...meeting, ...values });
      setShow(false);
      toast.success("تم تأجيل الاجتماع");
    } catch (error) {
      toast.error("حدث خطأ في تأجيل الاجتماع");
    }
  };

  return (
    <>
      <FromContainer
        initialValues={{ delayDate: new Date() }}
        // validationSchema = {validationSchema}
        onSubmit={onSubmit}
      >
        <>
          <FormField inputType="dateTime" name="delayDate" />
          <SubmitButton title="تأجيل" />
        </>
      </FromContainer>
    </>
  );
}

export default DelayMeetingForm;
