import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { FcAlarmClock } from "react-icons/fc";
import moment from "moment";
import AppModal from "../Modal/AppModal";
import AppMeetingForm from "../Forms/MeetingFrom";
import AppPopOvers from "../PopOvers/AppPopOvers";
import { MdDeleteForever } from "react-icons/md";
import meetingApi from "../../services/MeetingServices";
import { militaryRanksMap, statusMap } from "../../utils/Map";
import { useAuth } from "../../context/auth";

const AppCard = ({
  title,
  meeting,
  cardColor = "primary",
  textColor = "white",
}) => {
  const [show, setShow] = useState(false);
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
      await meetingApi.update(meeting.meetingId, meeting);
      switch (status) {
        case "Accepted":
          toast.success("تم الموافقة");
          break;

        case "ٌRejected":
          toast.success("تم الرفض");
          break;

        case "Delayed":
          toast.success("تم تأجيل");
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
        style={{ direction: "ltr", minWidth: "500px" }}
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
          {user["abilities"].includes("update_meeting") && (
            <AppPopOvers
              title="تعديل هذا الاجتماع"
              bodyContent=" سوف تقوم بتعديل هذا الاجتماع"
            >
              <Button
                variant="warning"
                style={{ width: "50px", height: "50px", borderRadius: "25px" }}
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
                {moment(meeting["comeAt"]).calendar()} :وقت الوصول
              </Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              {meeting["enteredAt"] && (
                <Card.Text style={{ float: "right" }}>
                  {moment(meeting["enteredAt"]).calendar()} :وقت الدخول
                </Card.Text>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              {meeting["exitAt"] && (
                <Card.Text style={{ float: "right" }}>
                  {moment(meeting["exitAt"]).calendar()} :وقت الخروج
                </Card.Text>
              )}
            </Col>
          </Row>

          <Row>
            <Col>
              <Card.Text style={{ float: "right" }}>
                حالة الاجتماع : {statusMap.get(meeting["status"])}
              </Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Text style={{ float: "right" }}>
                اسم الشخص : {meeting["personName"]}
              </Card.Text>
            </Col>
            <Col>
              <Card.Text style={{ float: "right" }}>
                عسكري/مدني : {militaryRanksMap.get(meeting["personType"])}
              </Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Text style={{ float: "right" }}>
                الوظيفة : {meeting["job"]}
              </Card.Text>
            </Col>
            {meeting["militaryRank"] && (
              <Col>
                <Card.Text style={{ float: "right", marginLeft: "30px" }}>
                  الرتبة : {meeting["militaryRank"]}
                </Card.Text>
              </Col>
            )}
          </Row>
          <Row>
            <Col>
              <Card.Text style={{ float: "right" }}>
                جيش/شركة : {meeting["army"]}
              </Card.Text>
            </Col>
            {meeting["unit"] && (
              <Col>
                <Card.Text style={{ float: "right", marginLeft: "30px" }}>
                  الوحدة : {meeting["unit"]}
                </Card.Text>
              </Col>
            )}
          </Row>
          <Row>
            <Col>
              <Card.Text style={{ float: "right" }}>
                قسم : {meeting["departmentName"]}
              </Card.Text>
            </Col>
            <Col>
              <Card.Text style={{ float: "right" }}>
                يريد مقابلته : {meeting["administrator"]}
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
                    onClick={() => handleUpdate("Delayed", meeting)}
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
    </>
  );
};

const styles = {
  button: {
    width: "80px",
    height: "80px",
    marginRight: "90px",
    borderRadius: "40px",
    marginBottom: "10px",
  },
};

export default AppCard;
