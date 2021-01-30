import { Modal } from "react-bootstrap";
import React from "react";

const AppModal = ({ show, setShow, children }) => {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default AppModal;
