import React from "react";
import { useFormikContext } from "formik";
import { Button } from "react-bootstrap";

function SubmitButton({ title, color }) {
  const { handleSubmit } = useFormikContext();
  return (
    <Button type="submit" variant="outline-primary" onClick={handleSubmit}>
      {title}
    </Button>
  );
}

export default SubmitButton;
