import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/auth";
import userApi from "../../services/UserServices";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const AppNavBar = () => {
  const { user, setUser } = useAuth();
  const history = useHistory();
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Navbar.Brand href="/">منظومة الأجتماعات</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto justify-content-center align-items-center">
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
          <Link
            to="/inquires"
            style={{ color: "white", textDecoration: "none" }}
          >
            استعلامات
          </Link>
        </Nav>
        <Nav style={{ position: "relative", right: "50px" }}>
          <NavDropdown
            title={user["name"] + " / " + user["militaryRank"]}
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
