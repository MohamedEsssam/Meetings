import React, { useEffect, useState } from "react";
import { CardColumns } from "react-bootstrap";
import openSocket from "socket.io-client";
import { useAuth } from "../context/auth";
import meetingApi from "../services/MeetingServices";

import AppCard from "../components/Card/AppCard";

const CommenderScreen = () => {
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
    <CardColumns style={{ margin: "20px" }}>
      {fetchedMeetings &&
        fetchedMeetings.map((meeting) => {
          return <AppCard meeting={meeting} />;
        })}
    </CardColumns>
  );
};

export default CommenderScreen;
