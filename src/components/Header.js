import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Select Operation" id="basic-nav-dropdown">
              <NavDropdown.Item
                onClick={() => {
                  handleNavigate("/");
                }}
              >
                Profit and Loss
              </NavDropdown.Item>
              {/* <NavDropdown.Item href="cash-flow">Cash Flow</NavDropdown.Item> */}
              <NavDropdown.Item
                onClick={() => {
                  handleNavigate("/cash-flow");
                }}
              >
                Balance Sheet
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => {
                  handleNavigate("/stakeholders");
                }}
              >
                Shareholders
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
