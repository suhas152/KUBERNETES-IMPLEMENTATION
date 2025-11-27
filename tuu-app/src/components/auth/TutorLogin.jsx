import React, { useState } from 'react';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import TutorService from '../../services/TutorService';

const TutorLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userData = await TutorService.login(credentials.username, credentials.password);
      await login(userData, 'TUTOR');
      navigate('/tutor/dashboard', { replace: true });
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || 'Login failed. Please check your credentials.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h2 className="text-center mb-4">Tutor Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit" 
            className="w-100"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default TutorLogin;