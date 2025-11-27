import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Tabs, Tab, Image, ListGroup, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGraduationCap, faBookOpen, faSave, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext';
import UserService from '../services/UserService';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const CustomerProfilePage = () => {
  const { currentUser, userRole } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  
  // Customer-specific information
  const [customerData, setCustomerData] = useState({
    educationLevel: '',
    interests: [],
    preferredSubjects: []
  });
  
  // New interest form
  const [newInterest, setNewInterest] = useState('');
  
  // New preferred subject form
  const [newPreferredSubject, setNewPreferredSubject] = useState('');
  
  // Load user profile data
  useEffect(() => {
    const loadCustomerProfile = async () => {
      try {
        setLoading(true);
        // In a real app, this would fetch from the API
        // For now, we'll use mock data
        if (currentUser) {
          setProfileData({
            firstName: currentUser.firstName || '',
            lastName: currentUser.lastName || '',
            email: currentUser.email || '',
            phone: currentUser.phone || '',
            bio: currentUser.bio || '',
            address: currentUser.address || '',
            city: currentUser.city || '',
            state: currentUser.state || '',
            zipCode: currentUser.zipCode || '',
            country: currentUser.country || ''
          });
          
          // Mock customer data
          setCustomerData({
            educationLevel: 'Undergraduate',
            interests: ['Music', 'Sports', 'Reading'],
            preferredSubjects: ['Mathematics', 'Physics', 'Computer Science']
          });
        }
      } catch (err) {
        setError('Failed to load profile data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadCustomerProfile();
  }, [currentUser]);
  
  // Handle profile form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };
  
  // Handle customer data changes
  const handleCustomerDataChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value
    });
  };
  
  // Handle profile form submission
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      // In a real app, this would call the API
      // await UserService.updateProfile(profileData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle customer data submission
  const handleCustomerDataSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      // In a real app, this would call the API
      // await UserService.updateCustomerProfile(customerData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Learning preferences updated successfully');
    } catch (err) {
      setError(err.message || 'Failed to update learning preferences');
    } finally {
      setLoading(false);
    }
  };
  
  // Add new interest
  const handleAddInterest = (e) => {
    e.preventDefault();
    if (!newInterest.trim()) return;
    
    if (!customerData.interests.includes(newInterest)) {
      setCustomerData({
        ...customerData,
        interests: [...customerData.interests, newInterest]
      });
    }
    
    setNewInterest('');
  };
  
  // Remove interest
  const handleRemoveInterest = (interest) => {
    setCustomerData({
      ...customerData,
      interests: customerData.interests.filter(i => i !== interest)
    });
  };
  
  // Add new preferred subject
  const handleAddPreferredSubject = (e) => {
    e.preventDefault();
    if (!newPreferredSubject.trim()) return;
    
    if (!customerData.preferredSubjects.includes(newPreferredSubject)) {
      setCustomerData({
        ...customerData,
        preferredSubjects: [...customerData.preferredSubjects, newPreferredSubject]
      });
    }
    
    setNewPreferredSubject('');
  };
  
  // Remove preferred subject
  const handleRemovePreferredSubject = (subject) => {
    setCustomerData({
      ...customerData,
      preferredSubjects: customerData.preferredSubjects.filter(s => s !== subject)
    });
  };
  
  return (
    <>
      <Navbar />
      <Container className="py-5">
        <Row>
          <Col lg={3} md={4} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body className="text-center">
                <div className="profile-image-container mb-3">
                  <div className="profile-image-placeholder">
                    <FontAwesomeIcon icon={faUser} size="4x" className="text-secondary" />
                  </div>
                </div>
                
                <h4>{profileData.firstName} {profileData.lastName}</h4>
                <p className="text-muted">Student</p>
                
                <div className="customer-stats mt-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span><FontAwesomeIcon icon={faGraduationCap} className="me-2" />Education:</span>
                    <Badge bg="primary">{customerData.educationLevel}</Badge>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span><FontAwesomeIcon icon={faBookOpen} className="me-2" />Subjects:</span>
                    <Badge bg="success">{customerData.preferredSubjects.length}</Badge>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={9} md={8}>
            <Card className="shadow-sm">
              <Card.Header>
                <Tabs
                  activeKey={activeTab}
                  onSelect={(k) => setActiveTab(k)}
                  className="mb-3"
                >
                  <Tab eventKey="profile" title="Basic Information" />
                  <Tab eventKey="preferences" title="Learning Preferences" />
                </Tabs>
              </Card.Header>
              
              <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                
                {activeTab === 'profile' && (
                  <Form onSubmit={handleProfileSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="firstName">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            value={profileData.firstName}
                            onChange={handleProfileChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="lastName">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            value={profileData.lastName}
                            onChange={handleProfileChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="email">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleProfileChange}
                            required
                            disabled
                          />
                          <Form.Text className="text-muted">
                            Email cannot be changed
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="phone">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleProfileChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Form.Group className="mb-3" controlId="bio">
                      <Form.Label>Bio</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="bio"
                        value={profileData.bio}
                        onChange={handleProfileChange}
                        placeholder="Tell us a bit about yourself and your learning goals"
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="address">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={profileData.address}
                        onChange={handleProfileChange}
                      />
                    </Form.Group>
                    
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="city">
                          <Form.Label>City</Form.Label>
                          <Form.Control
                            type="text"
                            name="city"
                            value={profileData.city}
                            onChange={handleProfileChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="state">
                          <Form.Label>State/Province</Form.Label>
                          <Form.Control
                            type="text"
                            name="state"
                            value={profileData.state}
                            onChange={handleProfileChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="zipCode">
                          <Form.Label>Zip/Postal Code</Form.Label>
                          <Form.Control
                            type="text"
                            name="zipCode"
                            value={profileData.zipCode}
                            onChange={handleProfileChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="country">
                          <Form.Label>Country</Form.Label>
                          <Form.Control
                            type="text"
                            name="country"
                            value={profileData.country}
                            onChange={handleProfileChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <Button 
                        type="submit" 
                        variant="primary" 
                        disabled={loading}
                      >
                        {loading ? 'Saving...' : (
                          <><FontAwesomeIcon icon={faSave} className="me-2" />Save Changes</>
                        )}
                      </Button>
                    </div>
                  </Form>
                )}
                
                {activeTab === 'preferences' && (
                  <Form onSubmit={handleCustomerDataSubmit}>
                    <Form.Group className="mb-4" controlId="educationLevel">
                      <Form.Label>Education Level</Form.Label>
                      <Form.Select
                        name="educationLevel"
                        value={customerData.educationLevel}
                        onChange={handleCustomerDataChange}
                        required
                      >
                        <option value="">Select your education level</option>
                        <option value="Elementary">Elementary School</option>
                        <option value="Middle School">Middle School</option>
                        <option value="High School">High School</option>
                        <option value="Undergraduate">Undergraduate</option>
                        <option value="Graduate">Graduate</option>
                        <option value="Postgraduate">Postgraduate</option>
                        <option value="Professional">Professional</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Form.Group>
                    
                    <hr className="my-4" />
                    
                    <h5 className="mb-3">Interests</h5>
                    <Row className="mb-4">
                      <Col md={6}>
                        <Form.Group controlId="newInterest">
                          <Form.Label>Add Interest</Form.Label>
                          <div className="d-flex">
                            <Form.Control
                              type="text"
                              value={newInterest}
                              onChange={(e) => setNewInterest(e.target.value)}
                              placeholder="e.g. Music, Sports, Reading"
                            />
                            <Button 
                              variant="outline-primary" 
                              className="ms-2" 
                              onClick={handleAddInterest}
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </Button>
                          </div>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Label>Current Interests</Form.Label>
                        <ListGroup>
                          {customerData.interests.map((interest, index) => (
                            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                              {interest}
                              <Button 
                                variant="outline-danger" 
                                size="sm" 
                                onClick={() => handleRemoveInterest(interest)}
                              >
                                <FontAwesomeIcon icon={faMinus} />
                              </Button>
                            </ListGroup.Item>
                          ))}
                          {customerData.interests.length === 0 && (
                            <ListGroup.Item className="text-muted">No interests added</ListGroup.Item>
                          )}
                        </ListGroup>
                      </Col>
                    </Row>
                    
                    <hr className="my-4" />
                    
                    <h5 className="mb-3">Preferred Subjects</h5>
                    <Row className="mb-4">
                      <Col md={6}>
                        <Form.Group controlId="newPreferredSubject">
                          <Form.Label>Add Preferred Subject</Form.Label>
                          <div className="d-flex">
                            <Form.Control
                              type="text"
                              value={newPreferredSubject}
                              onChange={(e) => setNewPreferredSubject(e.target.value)}
                              placeholder="e.g. Mathematics, Physics, English"
                            />
                            <Button 
                              variant="outline-primary" 
                              className="ms-2" 
                              onClick={handleAddPreferredSubject}
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </Button>
                          </div>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Label>Current Preferred Subjects</Form.Label>
                        <ListGroup>
                          {customerData.preferredSubjects.map((subject, index) => (
                            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                              <div>
                                <FontAwesomeIcon icon={faBookOpen} className="me-2 text-primary" />
                                {subject}
                              </div>
                              <Button 
                                variant="outline-danger" 
                                size="sm" 
                                onClick={() => handleRemovePreferredSubject(subject)}
                              >
                                <FontAwesomeIcon icon={faMinus} />
                              </Button>
                            </ListGroup.Item>
                          ))}
                          {customerData.preferredSubjects.length === 0 && (
                            <ListGroup.Item className="text-muted">No preferred subjects added</ListGroup.Item>
                          )}
                        </ListGroup>
                      </Col>
                    </Row>
                    
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                      <Button 
                        type="submit" 
                        variant="primary" 
                        disabled={loading}
                      >
                        {loading ? 'Saving...' : (
                          <><FontAwesomeIcon icon={faSave} className="me-2" />Save Learning Preferences</>
                        )}
                      </Button>
                    </div>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default CustomerProfilePage;