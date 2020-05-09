import React from "react";
import { withRouter } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const MainNavbar = () => {
  return (
    <Navbar bg="dark" expand="md" variant="dark">
      <LinkContainer to="/">
        <Navbar.Brand>Tecno-Craft Mail</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <LinkContainer to="/login">
            <Nav.Link className="">Login</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/userlist">
            <Nav.Link className="">Users</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(MainNavbar);
//export default MainNavbar;
