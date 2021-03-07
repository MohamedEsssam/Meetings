const route = require("express").Router();
const getAllMeetings = require("../../controllers/meeting/getAllMeetings");
const getMeeting = require("../../controllers/meeting/getMeeting");
const createMeeting = require("../../controllers/meeting/createMeeting");
const updateMeeting = require("../../controllers/meeting/updateMeeting");
const deleteMeeting = require("../../controllers/meeting/deleteMeeting");
const deleteAllMeeting = require("../../controllers/meeting/deleteAllMeeting");
const hideAllMeeting = require("../../controllers/meeting/hideAllMeeting");
const authJwt = require("../../middleware/authJwt");

route.get("/", authJwt, getAllMeetings);
route.get("/:meetingId", authJwt, getMeeting);
route.post("/", authJwt, createMeeting);
route.put("/", authJwt, updateMeeting);
route.delete("/deleteAll", authJwt, deleteAllMeeting);
route.delete("/hideAll", authJwt, hideAllMeeting);
route.delete("/:meetingId", authJwt, deleteMeeting);

module.exports = route;
