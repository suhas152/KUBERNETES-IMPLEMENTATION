import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import BookingService from '../services/BookingService';

const CreateBooking = () => {
  const { tutorId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bookingDateTime: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Get current student from local storage
  const currentStudent = JSON.parse(localStorage.getItem('student'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!currentStudent) {
      setError('Please login as a student to make a booking');
      setLoading(false);
      return;
    }

    try {
      const bookingData = {
        studentId: currentStudent.id,
        tutorId: parseInt(tutorId),
        bookingDateTime: new Date(formData.bookingDateTime).toISOString(),
        status: 'PENDING'
      };

      await BookingService.createBooking(bookingData);
      navigate('/bookings', { state: { message: 'Booking created successfully!' } });
    } catch (err) {
      setError(err.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  // Calculate minimum date (today) and maximum date (30 days from now)
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  return (
    <Container className="py-4">
      <h2>Create Booking</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Select Date and Time</Form.Label>
          <Form.Control
            type="datetime-local"
            name="bookingDateTime"
            value={formData.bookingDateTime}
            onChange={handleChange}
            min={today}
            max={maxDateStr}
            required
          />
        </Form.Group>

        <Button 
          variant="primary" 
          type="submit" 
          disabled={loading || !currentStudent}
        >
          {loading ? 'Creating Booking...' : 'Create Booking'}
        </Button>
      </Form>
    </Container>
  );
};

export default CreateBooking;