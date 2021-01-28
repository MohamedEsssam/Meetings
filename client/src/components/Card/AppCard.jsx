import React from "react";
import { Card } from "react-bootstrap";
import moment from "moment";

const AppCard = ({
  header,
  title,
  meeting,
  cardColor = "dark",
  textColor = "white",
}) => {
  return (
    <Card
      bg={cardColor}
      text={textColor}
      style={{ width: "18rem" }}
      className="mb-2"
      style={{ direction: "ltr" }}
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
          {moment(meeting["comeAt"]).calendar()} :حالة الاجتماع
        </Card.Text>
        <Card.Text style={{ float: "right" }}>
          {moment(meeting["comeAt"]).calendar()} :اسم الشخص
        </Card.Text>
        <Card.Text style={{ float: "right" }}>
          {moment(meeting["comeAt"]).calendar()} :عسكري/مدني
        </Card.Text>
        <Card.Text style={{ float: "right", marginLeft: "30px" }}>
          {moment(meeting["comeAt"]).calendar()} :الرتبة
        </Card.Text>
        <Card.Text style={{ float: "right" }}>
          {moment(meeting["comeAt"]).calendar()} :الوظيفة
        </Card.Text>
        <Card.Text style={{ float: "right", marginLeft: "30px" }}>
          {moment(meeting["comeAt"]).calendar()} :الوحدة
        </Card.Text>
        <Card.Text style={{ float: "right" }}>
          {moment(meeting["comeAt"]).calendar()} :جيش
        </Card.Text>
        <Card.Text style={{ float: "right" }}>
          {moment(meeting["comeAt"]).calendar()} :الشخص الذي يريد مقابلته
        </Card.Text>
        <Card.Text style={{ float: "right" }}>
          {moment(meeting["comeAt"]).calendar()} :قسم
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default AppCard;
