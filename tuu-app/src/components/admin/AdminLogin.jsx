import React, { useState } from 'react';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const username = formData.username.trim();
    const password = formData.password.trim();

    try {
      // First, try GET with query params (your API may expect this)
      let response;
      try {
        response = await axios.get('http://localhost:2025/admin/login', {
          params: { username, password }
        });
      } catch (getErr) {
        // If GET fails with 404/405 or network, try POST as a fallback
        if (
          getErr?.response?.status === 404 ||
          getErr?.response?.status === 405 ||
          getErr?.code === 'ERR_NETWORK'
        ) {
          response = await axios.post('http://localhost:2025/admin/login', {
            username,
            password
          });
        } else {
          throw getErr;
        }
      }

      if (response?.data) {
        console.log('Admin login success:', response.data);
        const adminData = { ...response.data, role: 'ADMIN' };
        await login(adminData, 'ADMIN');
        navigate('/admin/dashboard', { replace: true });
        return;
      }

      setError('Invalid admin credentials');
    } catch (err) {
      console.error('Admin login error:', err);
      const serverMsg = err?.response?.data?.message || err?.response?.data;
      setError(serverMsg || 'Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card style={{ width: '400px' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Admin Login</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
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

            <Button 
              variant="primary" 
              type="submit" 
              disabled={loading}
              className="w-100"
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminLogin;