const route = require("express").Router();
const getAllMeetings = require("../../controllers/meeting/getAllMeetings");
const getMeeting = require("../../controllers/meeting/getMeeting");
const createMeeting = require("../../controllers/meeting/createMeeting");
const updateMeeting = require("../../controllers/meeting/updateMeeting");
const deleteMeeting = require("../../controllers/meeting/deleteMeeting");
const authJwt = require("../../middleware/authJwt");

route.get("/", authJwt, getAllMeetings);
route.get("/:meetingId", authJwt, getMeeting);
route.post("/", authJwt, createMeeting);
route.put("/", authJwt, updateMeeting);
route.delete("/", authJwt, deleteMeeting);

module.exports = route;
