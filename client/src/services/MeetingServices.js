import http from "./client";
import { uri } from "../config/config";

const endpoint = `${uri}/api/meeting`;

const getAllForSpecificDepartment = async (departmentId) => {
  const { data: meetings } = await http.get(
    `${endpoint}/?departmentId=${departmentId}`
  );

  return meetings;
};

const getAll = async () => {
  const { data: meetings } = await http.get(endpoint);

  return meetings;
};

const getOne = async (meetingId) => {
  const { data: meeting } = await http.get(`${endpoint}/${meetingId}`);

  return meeting;
};

const create = async (meetingObj) => {
  const { data: meeting } = await http.post(endpoint, meetingObj);

  return meeting;
};

const update = async (meetingId, newMeetingObj) => {
  newMeetingObj["meetingId"] = meetingId;
  const { data: meeting } = await http.put(endpoint, newMeetingObj);

  return meeting;
};

const remove = async (meetingId) => {
  const { meeting } = await http.delete(`${endpoint}/${meetingId}`);

  return meeting;
};

const removeAll = async () => {
  const { data: meetings } = await http.delete(`${endpoint}/deleteAll`);

  return meetings;
};

export default {
  getAll,
  getAllForSpecificDepartment,
  getOne,
  create,
  update,
  remove,
  removeAll,
};
