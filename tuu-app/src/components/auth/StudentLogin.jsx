import React, { useState } from 'react';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import StudentService from '../../services/StudentService';

const StudentLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
    setSuccess('');

    try {
      console.log('Attempting login with:', credentials);
      const response = await StudentService.login(credentials.username, credentials.password);
      console.log('Login successful:', response);
      await login(response, 'STUDENT');
      setSuccess('Login successful! Welcome back...');
      // Use a shorter timeout and ensure the path is correct
      setTimeout(() => {
        navigate('/student/dashboard', { replace: true });
      }, 800); // Shorter delay for better UX
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h2 className="text-center mb-4">Student Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        
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
            className="w-100 mb-3"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          
          <div className="text-center">
            <Button 
              variant="link" 
              onClick={() => navigate('/')}
              className="px-0"
            >
              Back to Home
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default StudentLogin;