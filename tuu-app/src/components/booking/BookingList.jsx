import React, { useState, useEffect } from 'react';
import { Container, Card, Badge, Button, Row, Col } from 'react-bootstrap';
import BookingService from '../services/BookingService';

const BookingList = ({ role, userId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBookings();
  }, [role, userId]);

  const loadBookings = async () => {
    try {
      let response;
      if (role === 'TUTOR') {
        response = await BookingService.getTutorBookings(userId);
      } else if (role === 'STUDENT') {
        response = await BookingService.getStudentBookings(userId);
      }
      setBookings(response);
    } catch (err) {
      setError(err.message || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await BookingService.updateBookingStatus(bookingId, newStatus);
      loadBookings(); // Reload bookings after update
    } catch (err) {
      setError(err.message || 'Failed to update booking status');
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'CANCELLED':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <Container className="py-4">
      <h2>My Bookings</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {bookings.map(booking => (
          <Col key={booking.id}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>
                  {role === 'TUTOR' 
                    ? `Booking with ${booking.student.username}`
                    : `Booking with ${booking.tutor.username}`
                  }
                </Card.Title>
                <Card.Text>
                  <p>Date: {new Date(booking.bookingDateTime).toLocaleString()}</p>
                  <Badge bg={getStatusBadgeColor(booking.status)}>
                    {booking.status}
                  </Badge>
                </Card.Text>
                
                {role === 'TUTOR' && booking.status === 'PENDING' && (
                  <div className="d-flex gap-2">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleStatusUpdate(booking.id, 'CONFIRMED')}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleStatusUpdate(booking.id, 'CANCELLED')}
                    >
                      Decline
                    </Button>
                  </div>
                )}
                
                {booking.status === 'CONFIRMED' && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleStatusUpdate(booking.id, 'CANCELLED')}
                  >
                    Cancel
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {bookings.length === 0 && <p>No bookings found.</p>}
    </Container>
  );
};

export default BookingList;