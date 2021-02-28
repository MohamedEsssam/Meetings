import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/auth";
import userApi from "../../services/UserServices";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const AppNavBar = () => {
  const { user, setUser } = useAuth();
  console.log(user);
  const history = useHistory();
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Navbar.Brand href="#" /*{`/?departmentId=${user["departmentId"]}`}*/>
        منظومة الأجتماعات
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto justify-content-center align-items-center">
          {user["abilities"].includes("read_specific") && (
            <Link
              to={`/?departmentId=${user["departmentId"]}`}
              style={{
                color: "white",
                textDecoration: "none",
                marginRight: "20px",
              }}
            >
              اجتماعات القسم
            </Link>
          )}
          {user["abilities"].includes("read_all") && (
            <Link
              to="/allMeetings"
              style={{
                color: "white",
                textDecoration: "none",
                marginRight: "20px",
              }}
            >
              كل الاجتماعات
            </Link>
          )}
          {user["abilities"].includes("read_only_mine") && (
            <Link
              to={`/myMeetings`}
              style={{
                color: "white",
                textDecoration: "none",
                marginRight: "20px",
              }}
            >
              اجتماعاتي
            </Link>
          )}
          {user["abilities"].includes("create_user") && (
            <Link
              to="/admin"
              style={{
                color: "white",
                textDecoration: "none",
                marginRight: "20px",
              }}
            >
              ادمن
            </Link>
          )}
          {user["abilities"].includes("create_meeting") && (
            <Link
              to="/inquires"
              style={{ color: "white", textDecoration: "none" }}
            >
              استعلامات
            </Link>
          )}
        </Nav>
        <Nav style={{ position: "relative", right: "50px" }}>
          <NavDropdown
            title={user["militaryRank"] + " / " + user["name"]}
            id="collasible-nav-dropdown"
          >
            <NavDropdown.Item href="#action/3.1">
              الصفحة الشخصية
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              onClick={() => {
                history.push("/login");
                setUser(null);
                userApi.removeCurrentUser();
              }}
            >
              تسجيل خروج
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavBar;
