import http from "./client";
import { uri } from "../config/config";

const endpoint = `${uri}/api/permission`;

const getAll = async () => {
  const { data: permissions } = await http.get(endpoint);

  return permissions;
};

const getOne = async (permissionId) => {
  const { data: permission } = await http.get(`${endpoint}/${permissionId}`);

  return permission;
};

const create = async (permissionObj) => {
  const { data: permission } = await http.post(endpoint, permissionObj);

  return permission;
};

const update = async (permissionId, newPermissionObj) => {
  newPermissionObj["permissionId"] = permissionId;
  const { data: permission } = await http.put(endpoint, newPermissionObj);

  return permission;
};

const remove = async (permissionId) => {
  const { permission } = await http.delete(`${endpoint}/${permissionId}`);

  return permission;
};

const removeAll = async () => {
  const { data: permissions } = await http.delete(`${endpoint}/deleteAll`);

  return permissions;
};

export default {
  getAll,
  getOne,
  create,
  update,
  remove,
  removeAll,
};
