import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faHome, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext';

const UnauthorizedPage = () => {
  const { isAuthenticated, userRole } = useAuth();

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow text-center">
            <Card.Body className="p-5">
              <FontAwesomeIcon 
                icon={faExclamationTriangle} 
                size="4x" 
                className="text-warning mb-4" 
              />
              <h2 className="mb-4">Access Denied</h2>
              <p className="lead mb-4">
                You don't have permission to access this page.
              </p>
              
              {isAuthenticated() ? (
                <div>
                  <p className="mb-4">
                    Your current role ({userRole}) doesn't have the necessary permissions.
                  </p>
                  <div className="d-grid gap-3">
                    <Button 
                      as={Link} 
                      to={`/${userRole.toLowerCase().replace('role_', '')}/dashboard`}
                      variant="primary"
                    >
                      Go to Your Dashboard
                    </Button>
                    <Button as={Link} to="/" variant="outline-primary">
                      <FontAwesomeIcon icon={faHome} className="me-2" />
                      Return to Home
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="d-grid gap-3">
                  <Button as={Link} to="/login" variant="primary">
                    <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                    Login
                  </Button>
                  <Button as={Link} to="/" variant="outline-primary">
                    <FontAwesomeIcon icon={faHome} className="me-2" />
                    Return to Home
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UnauthorizedPage;