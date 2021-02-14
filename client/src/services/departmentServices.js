import http from "./client";
import { uri } from "../config/config";

const endpoint = `${uri}/api/department`;

const getAll = async () => {
  const { data: departments } = await http.get(endpoint);

  return departments;
};

export default {
  getAll,
};
