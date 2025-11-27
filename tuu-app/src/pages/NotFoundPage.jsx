import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome } from '@fortawesome/free-solid-svg-icons';

const NotFoundPage = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow text-center">
            <Card.Body className="p-5">
              <h1 className="display-1 text-muted mb-4">404</h1>
              <FontAwesomeIcon 
                icon={faSearch} 
                size="4x" 
                className="text-secondary mb-4" 
              />
              <h2 className="mb-4">Page Not Found</h2>
              <p className="lead mb-4">
                The page you are looking for might have been removed, had its name changed, 
                or is temporarily unavailable.
              </p>
              <div className="d-grid gap-3">
                <Button as={Link} to="/" variant="primary">
                  <FontAwesomeIcon icon={faHome} className="me-2" />
                  Return to Home
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;