import React, { useEffect, useState } from "react";
import { Button, CardColumns } from "react-bootstrap";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { IoIosRefreshCircle } from "react-icons/io";
import openSocket from "socket.io-client";
import { useAuth } from "../context/auth";
import meetingApi from "../services/MeetingServices";

import AppCard from "../components/Card/AppCard";
import AppModal from "../components/Modal/AppModal";
import AppMeetingForm from "../components/Forms/MeetingFrom";
import AppPopOvers from "../components/PopOvers/AppPopOvers";

const InquiresScreen = () => {
  const { user } = useAuth();
  const [fetchedMeetings, setFetchedMeetings] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [didMount, setDidMount] = useState(false);
  const [show, setShow] = useState(false);

  let meetings = [];
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // setDidMount(true);
    const socket = openSocket("http://localhost:9000");

    if (!fetched) loadMeetings();
    connectToMeeting(socket);

    // return () => setDidMount(false);
  }, []);

  const connectToMeeting = (socket) => {
    socket.on("meeting", (date) => {
      if (date.action === "create") createMeeting(date.meeting);
      if (date.action === "delete") deleteMeeting(date.meeting);
      if (date.action === "update") updateMeeting(date.meeting);
    });
  };

  const loadMeetings = async () => {
    const fetchedMeetings = await meetingApi.getAll();
    meetings = fetchedMeetings.slice(0);
    console.log(meetings);
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

  const updateMeeting = (meeting) => {
    let newMeetings = meetings.slice(0);
    newMeetings.map((obj) => {
      if (obj.meetingId === meeting.meetingID) {
        //TODO
      }
    });

    setFetchedMeetings(newMeetings);
  };

  return (
    <>
      <div style={{ position: "fixed", top: "10%", left: "10px" }}>
        <AppPopOvers
          title="اعادة تحميل الاجتماعات"
          bodyContent="سوف تقوم باعادة تحميل الاجتماعات"
        >
          <Button variant="secondary" style={styles.button}>
            <IoIosRefreshCircle size={40} />
          </Button>
        </AppPopOvers>
      </div>
      <CardColumns
        style={{ margin: "20px", maxWidth: "1170px", float: "right" }}
      >
        {fetchedMeetings &&
          fetchedMeetings.map((meeting) => {
            return <AppCard meeting={meeting} />;
          })}
      </CardColumns>

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
          <Button variant="danger" style={styles.button}>
            <MdDeleteForever size={40} />
          </Button>
        </AppPopOvers>
      </div>
      <AppModal show={show} setShow={setShow}>
        <AppMeetingForm />
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
