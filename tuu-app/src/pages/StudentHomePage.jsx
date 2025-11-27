import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const StudentHomePage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="welcome-text">Welcome back, {currentUser?.name || 'Student'}! 👋</h1>
          <p className="text-muted">Here's what you can do</p>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Find Tutors</Card.Title>
              <Card.Text>
                Browse through our qualified tutors and find the perfect match for your learning needs.
              </Card.Text>
              <Button 
                variant="primary" 
                onClick={() => navigate('/student/search-tutors')}
              >
                Search Tutors
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>My Bookings</Card.Title>
              <Card.Text>
                View and manage your current and upcoming tutoring sessions.
              </Card.Text>
              <Button 
                variant="outline-primary" 
                onClick={() => navigate('/student/bookings')}
              >
                View Bookings
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>My Profile</Card.Title>
              <Card.Text>
                Update your personal information and preferences.
              </Card.Text>
              <Button 
                variant="outline-primary" 
                onClick={() => navigate('/student/profile')}
              >
                Edit Profile
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentHomePage;