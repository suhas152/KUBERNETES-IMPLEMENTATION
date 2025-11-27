import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Alert, Spinner, Badge } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import BookingService from '../services/BookingService';
import MainLayout from '../components/layout/MainLayout';

const StatusBadge = ({ status }) => {
  const s = (status || '').toLowerCase();
  const variant = s === 'accepted' ? 'success' : s === 'rejected' ? 'danger' : s === 'completed' ? 'primary' : 'secondary';
  return <Badge bg={variant} className="text-uppercase">{status || 'PENDING'}</Badge>;
};

const StudentBookingsPage = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const studentId = currentUser?.s_id || currentUser?.id;
        const data = await BookingService.getStudentBookings(studentId);
        setBookings(data || []);
      } catch (err) {
        setError(err?.message || 'Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };
    if (currentUser) load();
  }, [currentUser]);

  if (loading) {
    return (
      <MainLayout>
        <Container className="text-center py-5"><Spinner animation="border" /></Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container className="py-4">
        <Row className="mb-3">
          <Col>
            <h2>Booking History</h2>
            <p className="text-muted mb-0">Total bookings: {bookings.length}</p>
          </Col>
        </Row>

        {error && <Alert variant="danger">{error}</Alert>}

        <Card>
          <Card.Body className="p-0">
            <Table responsive hover className="mb-0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tutor</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b.id || b.bookingId}>
                    <td>{b.id || b.bookingId}</td>
                    <td>{b.tutor?.tutor_name || b.tutor?.name || b.tutorName || '-'}</td>
                    <td>{b.bookingDateTime || b.date || '-'}</td>
                    <td><StatusBadge status={b.status} /></td>
                  </tr>
                ))}
                {bookings.length === 0 && (
                  <tr><td colSpan={4} className="text-center py-3">No bookings yet</td></tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </MainLayout>
  );
};

export default StudentBookingsPage; 