import React, { useState } from 'react';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TutorService from '../../services/TutorService.jsx';

const TutorRegistration = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    gender: '',
    mobileno: '',
    tutor_name: '',
    tutor_location: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

    try {
      const response = await axios.post('http://localhost:2025/tutor/add', formData);
      if (response.data) {
        navigate('/tutor/login', { 
          state: { message: 'Registration successful! Please login.' }
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4">Tutor Registration</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="tutor_name"
            value={formData.tutor_name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Gender</Form.Label>
          <Form.Select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="tel"
            name="mobileno"
            value={formData.mobileno}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="tutor_location"
            value={formData.tutor_location}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button 
          variant="primary" 
          type="submit" 
          disabled={loading}
          className="w-100"
        >
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </Form>
    </Container>
  );
};

export default TutorRegistration;