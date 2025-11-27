import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import TutorService from '../services/TutorService.jsx';
import { useAuth } from '../contexts/AuthContext';

const TutorLoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { username, password } = formData;
      const tutor = await TutorService.login(username, password);
      
      if (tutor) {
        // Store tutor info in auth context or local storage
        login(tutor);
        navigate('/tutor/profile');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed. ' + (err.message || 'Please try again.'));
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1 d-flex align-items-center py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={6} lg={5}>
              <Card className="shadow">
                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <h2 className="fw-bold">Tutor Login</h2>
                    <p className="text-muted">Sign in to your tutor account</p>
                  </div>
                  
                  {error && <Alert variant="danger">{error}</Alert>}
                  
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your username"
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-4">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your password"
                      />
                    </Form.Group>
                    
                    <div className="d-grid">
                      <Button 
                        variant="primary" 
                        type="submit" 
                        disabled={loading}
                        className="py-2"
                      >
                        {loading ? (
                          <span>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Signing in...
                          </span>
                        ) : (
                          <span>
                            <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                            Sign In
                          </span>
                        )}
                      </Button>
                    </div>
                  </Form>
                  
                  <div className="mt-4 text-center">
                    <p className="mb-0">
                      Don't have an account? <Link to="/tutor/register">Register</Link>
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default TutorLoginPage;