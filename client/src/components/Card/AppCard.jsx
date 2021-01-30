import React, { useState } from "react";
import { Card } from "react-bootstrap";
import moment from "moment";
import AppModal from "../Modal/AppModal";
import AppMeetingForm from "../Forms/MeetingFrom";

const AppCard = ({
  header,
  title,
  meeting,
  cardColor = "primary",
  textColor = "white",
}) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Card
        bg={cardColor}
        text={textColor}
        style={{ width: "18rem" }}
        className="mb-2"
        style={{ direction: "ltr", cursor: "pointer" }}
        onClick={() => setShow(true)}
      >
        <Card.Header>{header}</Card.Header>
        <Card.Body>
          <Card.Title>{title} </Card.Title>
          <Card.Text style={{ float: "right" }}>
            {moment(meeting["comeAt"]).calendar()} :وقت الوصول
          </Card.Text>
          {meeting["enteredAt"] && (
            <Card.Text style={{ float: "right" }}>
              {moment(meeting["enteredAt"]).calendar()} :وقت الدخول
            </Card.Text>
          )}
          {meeting["exitAt"] && (
            <Card.Text style={{ float: "right" }}>
              {moment(meeting["exitAt"]).calendar()} :وقت الخروج
            </Card.Text>
          )}
          <Card.Text style={{ float: "right" }}>
            {meeting["status"]} :حالة الاجتماع
          </Card.Text>
          <Card.Text style={{ float: "right" }}>
            {meeting["personName"]} :اسم الشخص
          </Card.Text>
          <Card.Text style={{ float: "right" }}>
            {meeting["personType"]} :عسكري/مدني
          </Card.Text>
          <Card.Text style={{ float: "right", marginLeft: "30px" }}>
            {meeting["militaryRank"]} :الرتبة
          </Card.Text>
          <Card.Text style={{ float: "right" }}>
            {meeting["job"]} :الوظيفة
          </Card.Text>
          <Card.Text style={{ float: "right", marginLeft: "30px" }}>
            {meeting["unit"]} :الوحدة
          </Card.Text>
          <Card.Text style={{ float: "right" }}>
            {meeting["army"]} :جيش
          </Card.Text>
          <Card.Text style={{ float: "right" }}>
            {meeting["administrator"]} :الشخص الذي يريد مقابلته
          </Card.Text>
          <Card.Text style={{ float: "right" }}>
            {meeting["departmentName"]} :قسم
          </Card.Text>
        </Card.Body>
      </Card>
      <AppModal show={show} setShow={setShow}>
        <AppMeetingForm
          initialValues={{
            personName: meeting["personName"],
            personType: meeting["personType"],
            job: meeting["job"],
            militaryRank: meeting["militaryRank"],
            unit: meeting["unit"],
            army: meeting["army"],
            administrator: meeting["administrator"],
            departmentId: meeting["departmentId"],
          }}
        />
      </AppModal>
    </>
  );
};

export default AppCard;
