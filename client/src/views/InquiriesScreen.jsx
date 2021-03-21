import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, CardColumns } from "react-bootstrap";
import { toast } from "react-toastify";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { IoIosRefreshCircle } from "react-icons/io";
import openSocket from "socket.io-client";
import { useAuth } from "../context/auth";
import meetingApi from "../services/MeetingServices";
import { uri } from "../config/config";

import AppCard from "../components/Card/AppCard";
import AppModal from "../components/Modal/AppModal";
import AppMeetingForm from "../components/Forms/MeetingFrom";
import AppPopOvers from "../components/PopOvers/AppPopOvers";

const InquiresScreen = () => {
  const { user } = useAuth();
  const history = useHistory();
  const [fetchedMeetings, setFetchedMeetings] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [didMount, setDidMount] = useState(false);
  const [show, setShow] = useState(false);
  var soundTrack = new Audio(
    "https://assets.coderrocketfuel.com/pomodoro-times-up.mp3"
  );
  soundTrack.muted = false;

  let meetings = [];

  useEffect(() => {
    // setDidMount(true);
    const socket = openSocket(uri);

    if (!fetched) loadMeetings();
    connectToMeeting(socket);

    soundTrack.load();
    // return () => setDidMount(false);
  }, []);

  const connectToMeeting = (socket) => {
    socket.on("meeting", (date) => {
      if (date.action === "create") createMeeting(date.meeting);
      if (date.action === "update") updateMeeting(date.meeting);
      if (date.action === "delete") deleteMeeting(date.meeting);
      if (date.action === "deleteAll") deleteAllMeeting(date.meetings);
      if (date.action === "hideAll") hideAllMeeting(date.meetings);
    });
  };

  const loadMeetings = async () => {
    const fetchedMeetings = await meetingApi.getAll();
    meetings = fetchedMeetings.slice(0);

    console.log(fetchedMeetings);
    setFetchedMeetings(fetchedMeetings);
    setFetched(true);
  };

  const createMeeting = (meeting) => {
    meetings.unshift(meeting);

    setFetchedMeetings(() => [...[], ...meetings]);
  };

  const deleteMeeting = (meeting) => {
    meetings = meetings.filter(function (obj) {
      return obj.meetingId !== meeting.meetingId;
    });

    setFetchedMeetings(() => [...[], ...meetings]);
  };

  const deleteAllMeeting = () => {
    meetings = [];
    setFetchedMeetings(() => [...[], ...[]]);
  };

  const hideAllMeeting = () => {
    let newMeetings = meetings.slice(0);
    newMeetings.map((obj) => {
      obj["hidden"] = true;
    });

    setFetchedMeetings(newMeetings);
  };

  const updateMeeting = (meeting) => {
    let newMeetings = meetings.slice(0);
    newMeetings.map((obj) => {
      if (obj.meetingId === meeting.meetingId) {
        obj["personName"] = meeting["personName"];
        obj["personType"] = meeting["personType"];
        obj["status"] = meeting["status"];
        obj["enteredAt"] = meeting["enteredAt"];
        obj["exitAt"] = meeting["exitAt"];
        obj["delayDate"] = meeting["delayDate"];
        obj["job"] = meeting["job"];
        obj["militaryRank"] = meeting["militaryRank"];
        obj["unit"] = meeting["unit"];
        obj["army"] = meeting["army"];
        obj["administrator"] = meeting["administrator"];
        obj["hidden"] = meeting["hidden"];
        obj["departmentId"] = meeting["departmentId"];
        obj["departmentName"] = meeting["departmentName"];
      }
    });

    setFetchedMeetings(newMeetings);
  };

  const handleDeleteAll = async () => {
    try {
      await meetingApi.removeAll();
      toast.warning("لقد تم حذف كل الاجتماعات");
    } catch (error) {
      toast.error("لقد حدث خطأ ما, لم يتم حذف كل الاجتماعات");
    }
  };

  const handleHideAll = async () => {
    try {
      await meetingApi.hideAll();
      toast.warning("لقد تم حذف كل الاجتماعات");
    } catch (error) {
      toast.error("لقد حدث خطأ ما, لم يتم حذف كل الاجتماعات");
    }
  };

  return (
    <>
      <div style={{ position: "fixed", top: "10%", left: "10px" }}>
        <AppPopOvers
          title="اعادة تحميل الاجتماعات"
          bodyContent="سوف تقوم باعادة تحميل الاجتماعات"
        >
          <Button
            variant="secondary"
            style={styles.button}
            onClick={() => history.push("/inquires")}
          >
            <IoIosRefreshCircle size={40} />
          </Button>
        </AppPopOvers>
      </div>
      <div
        style={{
          position: "relative",
          float: "right",
          top: "20px",
          right: "15px",
          display: "flex",
          flexWrap: "wrap",
          flex: "0 0 33.333333%",
          maxWidth: "90%",
        }}
      >
        {fetchedMeetings &&
          fetchedMeetings.map((meeting) => {
            return (
              meeting["hidden"] === "false" && (
                <AppCard
                  meeting={meeting}
                  cardColor={
                    meeting["status"].includes("Rejected")
                      ? "danger"
                      : meeting["status"].includes("Accepted")
                      ? "success"
                      : meeting["status"].includes("Delayed")
                      ? "warning"
                      : meeting["status"].includes("Exit")
                      ? "dark"
                      : "primary"
                  }
                />
              )
            );
          })}
      </div>
      <div style={{ position: "fixed", top: "74%", left: "10px" }}>
        <div>
          <AppPopOvers
            title="انشاء اجتماع جديد"
            bodyContent="سوف تقوم بانشاء اجتماع جديد"
          >
            <Button
              variant="primary"
              style={styles.button}
              onClick={() => setShow(true)}
            >
              <AiFillPlusCircle size={40} />
            </Button>
          </AppPopOvers>
        </div>
        <AppPopOvers
          title=" حذف كل الاجتماعات"
          bodyContent="احذر سوف تقوم بحذف كل الاجتماعات"
        >
          <Button
            variant="danger"
            style={styles.button}
            onClick={handleHideAll}
          >
            <MdDeleteForever size={40} />
          </Button>
        </AppPopOvers>
      </div>
      <AppModal show={show} setShow={setShow} title={"أنشاء اجتماع"}>
        <AppMeetingForm setShow={setShow} type="create" />
      </AppModal>
    </>
  );
};

const styles = {
  button: {
    width: "80px",
    height: "80px",
    borderRadius: "40px",
    marginBottom: "10px",
  },
};

export default InquiresScreen;
