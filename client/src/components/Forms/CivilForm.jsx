import React from "react";
import { Col, Row } from "react-bootstrap";

import FormField from "./FormField";

const CivilForm = () => {
  return (
    <>
      <Row>
        <Col>
          <FormField
            inputType="autoComplete"
            name="army"
            label="ادخل الجيش/الشركة/الهيئة"
          />
        </Col>
        <Col>
          <FormField inputType="autoComplete" name="job" label="ادخل الوظيفة" />
        </Col>
      </Row>
    </>
  );
};

export default CivilForm;
