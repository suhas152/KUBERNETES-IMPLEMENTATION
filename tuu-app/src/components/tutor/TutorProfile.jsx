import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Button, Badge } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import TutorService from '../services/TutorService';
import BookingService from '../services/BookingService';

const TutorProfile = () => {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTutorData();
  }, [id]);

  const loadTutorData = async () => {
    try {
      const tutorData = await TutorService.getTutorById(id);
      setTutor(tutorData);
      const bookingsData = await BookingService.getTutorBookings(id);
      setBookings(bookingsData);
    } catch (err) {
      setError(err.message || 'Failed to load tutor profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;
  if (!tutor) return <div>Tutor not found</div>;

  return (
    <Container className="py-4">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>{tutor.username}</Card.Title>
              <Card.Text>
                <p><strong>Email:</strong> {tutor.email}</p>
                <p><strong>Gender:</strong> {tutor.gender}</p>
                <p><strong>Contact:</strong> {tutor.mobileno}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <h3>Upcoming Bookings</h3>
          {bookings.length > 0 ? (
            bookings.map(booking => (
              <Card key={booking.id} className="mb-3">
                <Card.Body>
                  <Card.Title>
                    Booking with {booking.student.username}
                    <Badge 
                      bg={booking.status === 'CONFIRMED' ? 'success' : 'warning'}
                      className="ms-2"
                    >
                      {booking.status}
                    </Badge>
                  </Card.Title>
                  <Card.Text>
                    Date: {new Date(booking.bookingDateTime).toLocaleString()}
                  </Card.Text>
                  <Button 
                    variant="outline-primary"
                    size="sm"
                    onClick={() => {/* Handle booking action */}}
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No upcoming bookings</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default TutorProfile;