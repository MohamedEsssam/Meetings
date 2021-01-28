import React, { useContext } from "react";

const UserContext = React.createContext();

export function useAuth() {
  return useContext(UserContext);
}

export default UserContext;
