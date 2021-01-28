import React from "react";
import { useAuth } from "../../context/auth";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const AppNavBar = () => {
  const { user } = useAuth();
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">منظومة الأجتماعات</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto justify-content-center align-items-center">
          <Nav.Link href="/features">Features</Nav.Link>
          <Link to="/admin">admin</Link>
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
            <NavDropdown.Item href="#action/3.2">تسجيل خروج</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavBar;
