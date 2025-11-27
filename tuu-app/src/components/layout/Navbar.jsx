import React from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus, faUser, faSignOutAlt, faTachometerAlt, faChalkboardTeacher, faUserCog } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../contexts/AuthContext';

const AppNavbar = () => {
  const { currentUser, userRole, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Get dashboard link based on user role
  const getDashboardLink = () => {
    if (!userRole) return '/';
    
    const role = userRole.replace('ROLE_', '').toLowerCase();
    return `/${role}/dashboard`;
  };
  
  // Get profile link based on user role (map to existing routes)
  const getProfileLink = () => {
    const role = (userRole || '').replace('ROLE_', '');
    if (role === 'TUTOR') return '/tutor/dashboard';
    if (role === 'STUDENT') return '/student/profile';
    if (role === 'ADMIN') return '/admin/dashboard';
    return '/';
  };

  const isTutor = userRole === 'TUTOR' || userRole === 'ROLE_TUTOR';
  const isStudent = userRole === 'STUDENT' || userRole === 'ROLE_STUDENT';

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
          <span className="h4">FindMyTutor</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            
            {userRole === 'ROLE_ADMIN' && (
              <Nav.Link as={Link} to="/tutor/management">
                <FontAwesomeIcon icon={faUserCog} className="me-2" />
                Tutor Management
              </Nav.Link>
            )}
          </Nav>
          
          <Nav>
            {isAuthenticated() ? (
              <>
                <NavDropdown 
                  title={
                    <span>
                      <FontAwesomeIcon icon={faUser} className="me-2" />
                      {currentUser?.firstName || currentUser?.name || currentUser?.tutor_name || 'User'}
                    </span>
                  } 
                  id="user-dropdown"
                >
                  <NavDropdown.Item as={Link} to={getDashboardLink()}>
                    <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
                    Dashboard
                  </NavDropdown.Item>
                  
                  {isTutor && (
                    <NavDropdown.Item as={Link} to="/tutor/bookings">
                      <FontAwesomeIcon icon={faChalkboardTeacher} className="me-2" />
                      Bookings
                    </NavDropdown.Item>
                  )}
                  
                  {isStudent && (
                    <NavDropdown.Item as={Link} to="/student/bookings">
                      <FontAwesomeIcon icon={faChalkboardTeacher} className="me-2" />
                      Booking History
                    </NavDropdown.Item>
                  )}
                  
                  <NavDropdown.Item as={Link} to={getProfileLink()}>
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    Profile
                  </NavDropdown.Item>
                  
                  <NavDropdown.Divider />
                  
                  <NavDropdown.Item onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <NavDropdown 
                  title={
                    <span>
                      <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                      Login
                    </span>
                  } 
                  id="login-dropdown"
                  className="me-2"
                >
                  <NavDropdown.Item as={Link} to="/student/login">
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    Student Login
                  </NavDropdown.Item>
                  
                  <NavDropdown.Item as={Link} to="/tutor/login">
                    <FontAwesomeIcon icon={faChalkboardTeacher} className="me-2" />
                    Tutor Login
                  </NavDropdown.Item>

                  <NavDropdown.Item as={Link} to="/admin/login">
                    <FontAwesomeIcon icon={faUserCog} className="me-2" />
                    Admin Login
                  </NavDropdown.Item>
                </NavDropdown>
                
                <NavDropdown 
                  title={
                    <span>
                      <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                      Register
                    </span>
                  } 
                  id="register-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/student/register">
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    Student Register
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;