import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import openSocket from "socket.io-client";
import { useAuth } from "../context/auth";
import meetingApi from "../services/MeetingServices";
import departmentApi from "../services/departmentServices";
import audio from "../sound/audioOneTone.mp3";
import { uri } from "../config/config";

import AppCard from "../components/Card/AppCard";
import AppRadioInputGroup from "../components/AppRadioInputGroup";

const CommenderScreen = () => {
  const { user } = useAuth();
  const [fetchedMeetings, setFetchedMeetings] = useState([]);
  const [fetchedDepartments, setFetchedDepartments] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [didMount, setDidMount] = useState(false);
  const [radioValue, setRadioValue] = useState("");
  const [inputValue, setInputValue] = useState("");
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
    const fetchedDepartments = await departmentApi.getAll();
    setFetchedDepartments(fetchedDepartments);

    const fetchedMeetings = await meetingApi.getAll();
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
        obj["status"] = meeting["status"];
        obj["enteredAt"] = meeting["enteredAt"];
        obj["exitAt"] = meeting["exitAt"];
        obj["delayDate"] = meeting["delayDate"];
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
    <>
      <AppRadioInputGroup
        radioValue={radioValue}
        setRadioValue={setRadioValue}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "94.25vh",
          overflowX: "scroll",
          overflowY: "hidden",
        }}
      >
        {fetchedDepartments &&
          fetchedDepartments.map((department) => {
            return (
              <div style={{ width: "700px", minWidth: "600px" }}>
                <div
                  style={{
                    margin: "20px",
                    overflowY: "scroll",
                    height: "90vh",
                  }}
                >
                  <h1
                    style={{
                      fontSize: "30px",
                      position: "relative",
                      paddingLeft: "180px",
                    }}
                  >
                    {department["departmentName"]}
                  </h1>
                  {fetchedMeetings &&
                    fetchedMeetings.map((meeting) => {
                      return meeting["status"].includes(radioValue) &&
                        meeting["personName"].includes(inputValue) ? (
                        meeting["departmentName"] ===
                        department["departmentName"] ? (
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
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      );
                    })}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default CommenderScreen;
