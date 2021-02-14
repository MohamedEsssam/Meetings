import http from "./client";
import { uri } from "../config/config";

const endpoint = `${uri}/api/role`;

const getAll = async () => {
  const { data: roles } = await http.get(endpoint);

  return roles;
};

export default {
  getAll,
};
