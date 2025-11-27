import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner, Modal, Form } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import TutorService from '../services/TutorService';
import BookingService from '../services/BookingService';
import MainLayout from '../components/layout/MainLayout';

const StudentDashboard = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [showBook, setShowBook] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [bookingDateTime, setBookingDateTime] = useState('');

  useEffect(() => {
    loadTutors();
  }, []);

  const loadTutors = async () => {
    try {
      setLoading(true);
      const response = await TutorService.getAllTutors();
      setTutors(response || []);
    } catch (err) {
      console.error('Error loading tutors:', err);
      setError('Failed to load tutors. Please refresh the page to try again.');
    } finally {
      setLoading(false);
    }
  };

  const openBooking = (tutor) => {
    setSelectedTutor(tutor);
    setBookingDateTime('');
    setSuccess('');
    setError('');
    setShowBook(true);
  };

  const submitBooking = async (e) => {
    e.preventDefault();
    try {
      if (!currentUser?.s_id && !currentUser?.id) {
        setError('Missing student id. Please re-login.');
        return;
      }
      const studentId = currentUser.s_id || currentUser.id;
      const tutorId = selectedTutor.id || selectedTutor.tid;
      // Backend expects raw string body for bookingDateTime
      await BookingService.bookTutor(studentId, tutorId, bookingDateTime);
      setSuccess('Booking created successfully');
      setShowBook(false);
    } catch (err) {
      setError(err?.response?.data || err?.message || 'Failed to create booking');
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <Container className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container className="py-4">
        {/* Welcome Section */}
        <Row className="mb-4">
          <Col>
            <Card className="bg-primary text-white">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                  <div>
                    <h2 className="mb-1">Welcome, {currentUser?.name || currentUser?.s_name || 'Student'}!</h2>
                    <p className="mb-0">Teachers available: <strong>{tutors?.length || 0}</strong></p>
                  </div>
                  <div>
                    <Button variant="light" onClick={() => navigate('/student/bookings')}>Booking History</Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Alerts */}
        {error && (
          <Alert variant="danger" className="mb-4">
            {error}
          </Alert>
        )}
        {success && (
          <Alert variant="success" className="mb-4">
            {success}
          </Alert>
        )}

        {/* Tutors Grid */}
        <Row xs={1} md={2} lg={3} className="g-4">
          {tutors.length > 0 ? (
            tutors.map((tutor) => (
              <Col key={tutor.id || tutor.tid}>
                <Card className="h-100 shadow-sm hover-effect">
                  <Card.Body>
                    <Card.Title className="mb-3">{tutor.tutor_name || tutor.name}</Card.Title>
                    <Card.Text>
                      <div className="mb-2">
                        <strong>Email:</strong><br />
                        {tutor.email || '-'}
                      </div>
                      <div className="mb-2">
                        <strong>Mobile:</strong><br />
                        {tutor.mobileno || '-'}
                      </div>
                      <div className="mb-2">
                        <strong>Location:</strong><br />
                        {tutor.tutor_location || tutor.location || 'Not specified'}
                      </div>
                    </Card.Text>
                    <div className="d-grid">
                      <Button 
                        variant="primary"
                        onClick={() => openBooking(tutor)}
                      >
                        Book Session
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col xs={12}>
              <Alert variant="info">
                No tutors available at the moment. Please check back later.
              </Alert>
            </Col>
          )}
        </Row>

        {/* Booking Modal */}
        <Modal show={showBook} onHide={() => setShowBook(false)}>
          <Form onSubmit={submitBooking}>
            <Modal.Header closeButton>
              <Modal.Title>Book {selectedTutor?.tutor_name || selectedTutor?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Booking Date & Time (ISO)</Form.Label>
                <Form.Control
                  placeholder="e.g., 2025-09-30T15:00:00"
                  value={bookingDateTime}
                  onChange={(e) => setBookingDateTime(e.target.value)}
                  required
                />
                <Form.Text>Enter an ISO LocalDateTime string that your backend expects.</Form.Text>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowBook(false)}>Cancel</Button>
              <Button type="submit" variant="primary">Confirm Booking</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </MainLayout>
  );
};

export default StudentDashboard;