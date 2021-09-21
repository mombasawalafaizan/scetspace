import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { semester as sems } from "../assets/static-info";
import Login from "./Login";

const ScetSpaceHead = ({ loggedIn, user }) => {
  let semesterLinks = Object.keys(sems).map((sem) => {
    return (
      <div key={sems[sem].id}>
        <LinkContainer to={`/sems/${sems[sem].id}`}>
          <NavDropdown.Item>{sems[sem].name}</NavDropdown.Item>
        </LinkContainer>
      </div>
    );
  });

  return (
    <header>

      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <LinkContainer to="/">
          <Navbar.Brand className="brandName">ScetSpace</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <NavDropdown
              title="Semesters"
              className="semesters-dropdown"
              id="basic-nav-dropdown"
            >
              {semesterLinks}
            </NavDropdown>
            <LinkContainer to="/projects">
              <Nav.Link href="/projects">Projects</Nav.Link>
            </LinkContainer>
            {loggedIn ?
              <LinkContainer to="/uploads">
                <Nav.Link href="/uploads">Uploads</Nav.Link>
              </LinkContainer> : null
            }
          </Nav>
          <Nav className="container-fluid">
            <Nav.Item className="ml-auto login-info">
              {loggedIn && user && true ?
                <div id="loggedUser">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                  </svg>
                  <span id="username">{user.username} </span>
                </div>
                : <Login />}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default ScetSpaceHead;
