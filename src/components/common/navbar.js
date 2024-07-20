import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function CollapsibleExample() {
  return (
    <>

      {/* <div>
        <div class="container header-container">
          <h1 class="logo">
            <a class="main_gov grey-text" target="_blank" href="http://assam.gov.in">Government Of Assam</a>
            <a class="main_dept brown-text" href="https://animalhusbandry.assam.gov.in/" target="_blank">Animal Husbandry &amp; Veterinary</a>			<a class="sub_dept" href="https://dairy.assam.gov.in/">Directorate of Dairy Development</a>
          </h1>

        </div>
      </div> */}



      <div>
        <section className="wrapper header-wrapper">
          <div className="container header-container">
            <h1 className="logo">
              <a className="main_gov grey-text" target="_blank" href="http://assam.gov.in">Government Of Assam</a>
              <a className="main_dept brown-text" href="https://animalhusbandry.assam.gov.in/" target="_blank">Animal Husbandry &amp; Veterinary</a>			<a className="sub_dept" href="https://dairy.assam.gov.in/">Directorate of Dairy Development</a>
            </h1>
          </div>
        </section>


      </div>

      <Navbar className='m-0 p-0' collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/"> <i className="fa fa-home"></i></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/#aboutMe">About</Nav.Link>
              <Nav.Link href="/#latest-journal">Register</Nav.Link>

              {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}

            </Nav>
            {/* <Nav>
              <Nav.Link href="https://twitter.com/AnganaCk"><TwitterIcon /></Nav.Link>
              <Nav.Link href="mailto:anganachakrabarti01@gmail.com"><EmailIcon /></Nav.Link>
              <Nav.Link href="https://www.linkedin.com/in/angana-chakrabarti-a75a01157/"><LinkedInIcon /></Nav.Link>

            </Nav> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </>
  );
}

export default CollapsibleExample;