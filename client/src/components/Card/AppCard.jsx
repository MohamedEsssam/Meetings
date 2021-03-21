import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { GiRank3 } from "react-icons/gi";
import { MdDeleteForever } from "react-icons/md";
import {
  FcBusinessman,
  FcManager,
  FcAlarmClock,
  FcLibrary,
  FcElectricalThreshold,
} from "react-icons/fc";
import moment from "moment";
import { useAuth } from "../../context/auth";
import meetingApi from "../../services/MeetingServices";
import { militaryRanksMap, statusMap } from "../../utils/Map";

import AppModal from "../Modal/AppModal";
import AppPopOvers from "../PopOvers/AppPopOvers";
import AppMeetingForm from "../Forms/MeetingFrom";
import DelayMeetingForm from "../Forms/DelayMeetingForm";

const AppCard = ({
  title,
  meeting,
  cardColor = "primary",
  textColor = "white",
}) => {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const { user } = useAuth();

  const handleDelete = async (meetingId) => {
    try {
      await meetingApi.remove(meetingId);
      toast.warning("لقد تم حذف الاجتماع");
    } catch (error) {
      toast.error("لقد حدث خطأ ما, لم يتم حذف الاجتماع");
    }
  };

  const handleUpdate = async (status, meeting) => {
    try {
      meeting["status"] = status;
      if (meeting["status"] === "Accepted")
        meeting["enteredAt"] = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

      if (meeting["status"] === "Exit")
        meeting["exitAt"] = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

      await meetingApi.update(meeting.meetingId, meeting);
      switch (status) {
        case "Accepted":
          toast.success("تم الموافقة");
          break;

        case "ٌRejected":
          toast.success("تم الرفض");
          break;

        case "Exit":
          toast.success("تم خروج الزائر");
          break;

        default:
          break;
      }
    } catch (error) {
      toast.error("حدث خطأ في تعديل الاجتماع");
    }
  };
  return (
    <>
      <Card
        bg={cardColor}
        text={textColor}
        className="mb-2"
        style={{ direction: "ltr", minWidth: "500px", marginLeft:"10px" }}
      >
        <Card.Header>
          <AppPopOvers
            title="حذف هذا الاجتماع"
            bodyContent="احذر سوف تقوم بحذف هذا الاجتماع"
          >
            <Button
              variant="danger"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "25px",
                marginRight: "20px",
              }}
              onClick={() => {
                handleDelete(meeting.meetingId);
              }}
            >
              <MdDeleteForever size={25} />
            </Button>
          </AppPopOvers>
          {user["abilities"].includes("update_meeting") &&
            meeting["status"] === "Pending" && (
              <AppPopOvers
                title="تعديل هذا الاجتماع"
                bodyContent=" سوف تقوم بتعديل هذا الاجتماع"
              >
                <Button
                  variant="warning"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "25px",
                  }}
                  onClick={() => setShow(true)}
                >
                  <FiEdit size={25} />
                </Button>
              </AppPopOvers>
            )}
        </Card.Header>
        <Card.Body>
          <Card.Title>{title} </Card.Title>
          <Row>
            <Col>
              <Card.Text style={{ float: "right" }}>
                {moment(meeting["comeAt"]).calendar()} :وقت الوصول{" "}
                <FcAlarmClock size={30} />
              </Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              {meeting["enteredAt"] && (
                <Card.Text style={{ float: "right" }}>
                  {moment(meeting["enteredAt"]).calendar()} :وقت الدخول{" "}
                  <FcAlarmClock size={30} />
                </Card.Text>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              {meeting["delayDate"] && (
                <Card.Text style={{ float: "right" }}>
                  {moment(meeting["delayDate"]).calendar()} :الموعد المؤجل الي{" "}
                  <FcAlarmClock size={30} />
                </Card.Text>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              {meeting["exitAt"] && (
                <Card.Text style={{ float: "right" }}>
                  {moment(meeting["exitAt"]).calendar()} :وقت الخروج{" "}
                  <FcAlarmClock size={30} />
                </Card.Text>
              )}
            </Col>
          </Row>

          <Row>
            <Col>
              <Card.Text style={{ float: "right" }}>
                حالة الاجتماع : {statusMap.get(meeting["status"])}{" "}
                <FcElectricalThreshold size={30} />
              </Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Text style={{ float: "right" }}>
                اسم الشخص : {meeting["personName"]} <FcManager size={30} />
              </Card.Text>
            </Col>
            <Col>
              <Card.Text style={{ float: "right" }}>
                عسكري/مدني : {militaryRanksMap.get(meeting["personType"])}{" "}
                {meeting["personType"] === "Military" ? (
                  <GiRank3 size={30} />
                ) : (
                  <FcManager size={30} />
                )}
              </Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Text style={{ float: "right" }}>
                الوظيفة : {meeting["job"]}{" "}
                {meeting["personType"] === "Military" ? (
                  <GiRank3 size={30} />
                ) : (
                  <FcManager size={30} />
                )}
              </Card.Text>
            </Col>
            {meeting["militaryRank"] && (
              <Col>
                <Card.Text style={{ float: "right", marginLeft: "30px" }}>
                  الرتبة : {meeting["militaryRank"]} <GiRank3 size={30} />
                </Card.Text>
              </Col>
            )}
          </Row>
          <Row>
            <Col>
              <Card.Text style={{ float: "right" }}>
                جيش/شركة : {meeting["army"]} <FcLibrary size={30} />
              </Card.Text>
            </Col>
            {meeting["unit"] && (
              <Col>
                <Card.Text style={{ float: "right", marginLeft: "30px" }}>
                  الوحدة : {meeting["unit"]} <FcLibrary size={30} />
                </Card.Text>
              </Col>
            )}
          </Row>
          <Row>
            <Col>
              <Card.Text style={{ float: "right" }}>
                قسم : {meeting["departmentName"]} <FcLibrary size={30} />
              </Card.Text>
            </Col>
            <Col>
              <Card.Text style={{ float: "right" }}>
                يريد مقابلته : {meeting["administrator"]}{" "}
                <FcBusinessman size={30} />
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>

        {meeting["status"].includes("Pending") &&
          user["departmentName"] === meeting["departmentName"] && (
            <>
              <hr
                style={{ position: "relative", left: "20%", width: "300px" }}
              />
              <div style={{ position: "relative", left: "40px" }}>
                <AppPopOvers
                  title="الموافقة علي الاجتماع"
                  bodyContent="سوف تقوم بالموافقة علي الاجتماع"
                >
                  <Button
                    variant="success"
                    style={styles.button}
                    onClick={() => handleUpdate("Accepted", meeting)}
                  >
                    <FaCheck size={40} />
                  </Button>
                </AppPopOvers>
                <AppPopOvers
                  title="تأجيل الاجتماع"
                  bodyContent="سوف تقوم بتأجيل الاجتماع"
                >
                  <Button
                    variant="warning"
                    style={styles.button}
                    onClick={() => {
                      setShow1(true);
                    }}
                  >
                    <FcAlarmClock size={40} />
                  </Button>
                </AppPopOvers>
                <AppPopOvers
                  title="رفض الاجتماع"
                  bodyContent="سوف تقوم برفض الاجتماع"
                >
                  <Button
                    variant="danger"
                    style={styles.button}
                    onClick={() => handleUpdate("ٌRejected", meeting)}
                  >
                    <ImCross size={40} />
                  </Button>
                </AppPopOvers>
              </div>
            </>
          )}
        {meeting["status"].includes("Accepted") &&
          user["departmentName"] === meeting["departmentName"] && (
            <>
              <hr
                style={{ position: "relative", left: "20%", width: "300px" }}
              />
              <div style={{ position: "relative", left: "200px" }}>
                <AppPopOvers
                  title="خروج الزائر"
                  bodyContent="هذا يعني ان الزائر قد خرج من المكتب"
                >
                  <Button
                    variant="dark"
                    style={styles.button}
                    onClick={() => handleUpdate("Exit", meeting)}
                  >
                    <ImCross size={40} />
                  </Button>
                </AppPopOvers>
              </div>
            </>
          )}
      </Card>
      <AppModal show={show} setShow={setShow}>
        <AppMeetingForm
          type="update"
          meetingId={meeting.meetingId}
          setShow={setShow}
          initialValues={{
            personName: meeting["personName"],
            personType: meeting["personType"],
            job: meeting["job"],
            militaryRank: meeting["militaryRank"],
            unit: meeting["unit"],
            army: meeting["army"],
            administrator: meeting["administrator"],
            departmentName: meeting["departmentName"],
          }}
        />
      </AppModal>
      <AppModal show={show1} setShow={setShow1}>
        <DelayMeetingForm meeting={meeting} setShow={setShow1} />
      </AppModal>
    </>
  );
};

const styles = {
  button: {
    width: "80px",
    height: "80px",
    marginRight: "70px",
    borderRadius: "40px",
    marginBottom: "10px",
  },
};

export default AppCard;
