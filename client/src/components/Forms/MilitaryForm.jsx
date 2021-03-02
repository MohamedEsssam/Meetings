import React from "react";
import { Col, Row } from "react-bootstrap";

import FormField from "./FormField";

const MilitaryForm = () => {
  return (
    <>
      <Row>
        <Col>
          <FormField inputType="autoComplete" name="job" label="ادخل الوظيفة" />
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
            options={army}
            inputType="autoComplete"
            name="army"
            label="ادخل الجيش/الشركة/الهيئة"
          />
        </Col>
        <Col>
          <FormField
            options={unit}
            inputType="autoComplete"
            name="unit"
            label="ادخل الوحدة"
          />
        </Col>
      </Row>
    </>
  );
};

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

const army = [
  "القوات البحرية",
  "الجيش الاول",
  "جيش التاني",
  "الجيش التالت",
  "المنطقة الشمالية",
];

const unit = ["فرع الامن", "فرع النظم"];

export default MilitaryForm;
