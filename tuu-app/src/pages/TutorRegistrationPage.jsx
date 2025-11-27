import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import TutorService from '../services/TutorService.jsx';
import Tutor from '../models/Tutor';

const TutorRegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(new Tutor());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
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
    setSuccess('');
    
    try {
      const result = await TutorService.addTutor(formData);
      setSuccess('Registration successful! You can now login.');
      setTimeout(() => {
        navigate('/tutor/login');
      }, 2000);
    } catch (err) {
      setError('Registration failed. ' + (err.message || 'Please try again.'));
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1 py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={7}>
              <Card className="shadow">
                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <h2 className="fw-bold">Tutor Registration</h2>
                    <p className="text-muted">Create your tutor account</p>
                  </div>
                  
                  {error && <Alert variant="danger">{error}</Alert>}
                  {success && <Alert variant="success">{success}</Alert>}
                  
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Username</Form.Label>
                          <Form.Control 
                            type="text" 
                            name="username" 
                            value={formData.username} 
                            onChange={handleInputChange} 
                            required 
                            placeholder="Choose a username"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Password</Form.Label>
                          <Form.Control 
                            type="password" 
                            name="password" 
                            value={formData.password} 
                            onChange={handleInputChange} 
                            required 
                            placeholder="Create a password"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleInputChange} 
                            required 
                            placeholder="Enter your email"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Contact Number</Form.Label>
                          <Form.Control 
                            type="text" 
                            name="contactno" 
                            value={formData.contactno} 
                            onChange={handleInputChange} 
                            required 
                            placeholder="Enter your contact number"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Gender</Form.Label>
                          <Form.Select 
                            name="gender" 
                            value={formData.gender} 
                            onChange={handleInputChange} 
                            required
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Date of Birth</Form.Label>
                          <Form.Control 
                            type="date" 
                            name="dateofbirth" 
                            value={formData.dateofbirth} 
                            onChange={handleInputChange} 
                            required 
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Location</Form.Label>
                          <Form.Control 
                            type="text" 
                            name="location" 
                            value={formData.location} 
                            onChange={handleInputChange} 
                            required 
                            placeholder="Enter your location"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Qualification</Form.Label>
                          <Form.Control 
                            type="text" 
                            name="qualification" 
                            value={formData.qualification} 
                            onChange={handleInputChange} 
                            required 
                            placeholder="Enter your qualification"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Experience (years)</Form.Label>
                          <Form.Control 
                            type="text" 
                            name="experience" 
                            value={formData.experience} 
                            onChange={handleInputChange} 
                            required 
                            placeholder="Enter your experience"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Hourly Rate ($)</Form.Label>
                          <Form.Control 
                            type="number" 
                            name="hourlyrate" 
                            value={formData.hourlyrate} 
                            onChange={handleInputChange} 
                            required 
                            placeholder="Enter your hourly rate"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Bio</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={3} 
                        name="bio" 
                        value={formData.bio} 
                        onChange={handleInputChange} 
                        required 
                        placeholder="Tell us about yourself"
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-4">
                      <Form.Label>Subjects (comma separated)</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="subjects" 
                        value={formData.subjects} 
                        onChange={handleInputChange} 
                        required 
                        placeholder="e.g. Mathematics, Physics, Chemistry"
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
                            Registering...
                          </span>
                        ) : (
                          <span>
                            <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                            Register
                          </span>
                        )}
                      </Button>
                    </div>
                  </Form>
                  
                  <div className="mt-4 text-center">
                    <p className="mb-0">
                      Already have an account? <Link to="/tutor/login">Login</Link>
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

export default TutorRegistrationPage;