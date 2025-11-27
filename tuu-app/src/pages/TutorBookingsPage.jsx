import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Alert, Spinner, Badge } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import TutorService from '../services/TutorService';
import MainLayout from '../components/layout/MainLayout';

const StatusBadge = ({ status }) => {
  const s = (status || '').toLowerCase();
  const variant = s === 'accepted' ? 'success' : s === 'rejected' ? 'danger' : s === 'completed' ? 'primary' : 'secondary';
  return <Badge bg={variant} className="text-uppercase">{status || 'PENDING'}</Badge>;
};

const TutorBookingsPage = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await TutorService.getTutorBookings(currentUser?.id);
        setBookings(data || []);
      } catch (err) {
        setError(err?.message || 'Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };
    if (currentUser?.id) load();
  }, [currentUser?.id]);

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
            <h2>My Bookings</h2>
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
                  <th>Student</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b.id || b.bookingId}>
                    <td>{b.id || b.bookingId}</td>
                    <td>{b.studentName || b.student?.name || '-'}</td>
                    <td>{b.date || b.bookingDate || '-'}</td>
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

export default TutorBookingsPage; 