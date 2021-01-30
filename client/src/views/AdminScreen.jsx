import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { Button } from "react-bootstrap";

import AppPopOvers from "../components/PopOvers/AppPopOvers";
import AppModal from "../components/Modal/AppModal";
import AppMeetingForm from "../components/Forms/MeetingFrom";

const AdminScreen = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div style={{ position: "fixed", top: "40%", left: "40%" }}>
        <AppPopOvers
          title="اضافة شخص جديد"
          bodyContent="سوف تقوم باضافة شخص جديد"
        >
          <Button
            variant="primary"
            style={styles.button}
            onClick={() => setShow(true)}
          >
            <AiFillPlusCircle size={80} />
          </Button>
        </AppPopOvers>
      </div>
      <AppModal show={show} setShow={setShow}>
        <AppMeetingForm />
      </AppModal>
    </>
  );
};

const styles = {
  button: {
    width: "160px",
    height: "160px",
    borderRadius: "80px",
    marginBottom: "10px",
  },
};

export default AdminScreen;
