import http from "./client";
const endpoint = "http://localhost:9000/api/meeting";

const getAll = async () => {
  const { data: meeting } = await http.get(endpoint);

  return meeting;
};

export default {
  getAll,
};
