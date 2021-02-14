import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { Button } from "react-bootstrap";

import AppPopOvers from "../components/PopOvers/AppPopOvers";
import AppModal from "../components/Modal/AppModal";
import AppRegisterForm from "../components/Forms/RegisterForm";

const AdminScreen = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div style={{ position: "fixed", top: "40%", left: "40%" }}>
        <AppPopOvers
          title="أضافة مستخدم جديد"
          bodyContent="سوف تقوم بأضافة مستخدم جديد"
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
      <AppModal show={show} setShow={setShow} title={"تسجيل مستخدم جديد"}>
        <AppRegisterForm show={show} setShow={setShow} />
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
