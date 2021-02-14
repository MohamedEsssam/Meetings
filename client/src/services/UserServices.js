import jwdDecode from "jwt-decode";
import http from "./client";
import { uri } from "../config/config";

const endpoint = `${uri}/api/user`;

const login = async (userObj) => {
  const { headers } = await http.post(`${endpoint}/login`, userObj);
  localStorage.setItem("token", headers["authorization"]);

  return currentUser();
};

const register = async (userObj) => {
  return http.post(`${endpoint}/register`, userObj);
};
const getAll = async (departmentName) => {
  const { data: users } = await http.get(
    `${endpoint}/?departmentName=${departmentName}`
  );

  return users;
};

export const setUser = async (user) => {
  await localStorage.setItem("user", JSON.stringify(user));
};

export const removeCurrentUser = async (user) => {
  await localStorage.removeItem("token");
};

export const currentUser = async () => {
  try {
    const user = jwdDecode(localStorage.getItem("token"));
    return user;
  } catch (error) {
    console.log("error", error);
  }
};

export default {
  login,
  register,
  getAll,
  removeCurrentUser,
  currentUser,
};
