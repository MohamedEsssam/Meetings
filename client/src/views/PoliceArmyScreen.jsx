import React, { useEffect, useState } from "react";
import { CardColumns } from "react-bootstrap";
import { toast } from "react-toastify";
import openSocket from "socket.io-client";
import { useAuth } from "../context/auth";
import meetingApi from "../services/MeetingServices";
import audio from "../sound/audioOneTone.mp3";
import { uri } from "../config/config";

import AppCard from "../components/Card/AppCard";

const CommenderScreen = () => {
  const { user } = useAuth();
  const [fetchedMeetings, setFetchedMeetings] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [didMount, setDidMount] = useState(false);
  const [show, setShow] = useState(false);
  const audioTune = new Audio(audio);

  let meetings = [];
  useEffect(() => {
    // setDidMount(true);
    audioTune.load();
    const socket = openSocket(uri);

    if (!fetched) loadMeetings();
    connectToMeeting(socket);

    // return () => setDidMount(false);
  }, []);

  const playSound = () => {
    audioTune.play();
  };

  const connectToMeeting = (socket) => {
    socket.on("meeting", (date) => {
      if (date.action === "create") createMeeting(date.meeting);
      if (date.action === "update") updateMeeting(date.meeting);
      if (date.action === "delete") deleteMeeting(date.meeting);
      if (date.action === "deleteAll") deleteAllMeeting(date.meetings);
    });
  };

  const loadMeetings = async () => {
    const fetchedMeetings = await meetingApi.getAllForSpecificDepartment(
      user["departmentId"]
    );
    meetings = fetchedMeetings.slice(0);
    setFetchedMeetings(fetchedMeetings);
    setFetched(true);
  };

  const createMeeting = (meeting) => {
    meetings.unshift(meeting);

    setFetchedMeetings(() => [...[], ...meetings]);

    if (
      user["departmentName"] === meeting["departmentName"] &&
      user["name"] === meeting["administrator"]
    )
      playSound();
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

  const updateMeeting = (meeting) => {
    let newMeetings = meetings.slice(0);
    newMeetings.map((obj) => {
      if (obj.meetingId === meeting.meetingId) {
        obj["personName"] = meeting["personName"];
        obj["personType"] = meeting["personType"];
        obj["enteredAt"] = meeting["enteredAt"];
        obj["exitAt"] = meeting["exitAt"];
        obj["delayDate"] = meeting["delayDate"];
        obj["status"] = meeting["status"];
        obj["job"] = meeting["job"];
        obj["militaryRank"] = meeting["militaryRank"];
        obj["unit"] = meeting["unit"];
        obj["army"] = meeting["army"];
        obj["administrator"] = meeting["administrator"];
        obj["departmentId"] = meeting["departmentId"];
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

  return (
    <CardColumns style={{ margin: "20px" }}>
      {fetchedMeetings &&
        fetchedMeetings.map((meeting) => {
          return (
            user["name"] === meeting["administrator"] &&
            user["departmentId"] === meeting["departmentId"] && (
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
    </CardColumns>
  );
};

export default CommenderScreen;
