import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Tabs, Tab, Image, ListGroup, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGraduationCap, faClock, faMoneyBillWave, faMapMarkerAlt, faSave, faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext';
import UserService from '../services/UserService';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const TutorProfilePage = () => {
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
  
  // Tutor-specific information
  const [tutorData, setTutorData] = useState({
    hourlyRate: 0,
    education: '',
    experience: '',
    subjects: [],
    availability: [],
    locations: []
  });
  
  // New subject form
  const [newSubject, setNewSubject] = useState('');
  
  // New availability form
  const [newAvailability, setNewAvailability] = useState({
    dayOfWeek: 'MONDAY',
    startTime: '09:00',
    endTime: '17:00'
  });
  
  // New location form
  const [newLocation, setNewLocation] = useState('');
  
  // Load user profile data
  useEffect(() => {
    const loadTutorProfile = async () => {
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
          
          // Mock tutor data
          setTutorData({
            hourlyRate: 35,
            education: 'Master\'s in Computer Science, University of Technology',
            experience: '5 years of teaching experience in programming and mathematics',
            subjects: ['Mathematics', 'Computer Science', 'Programming'],
            availability: [
              { id: 1, dayOfWeek: 'MONDAY', startTime: '09:00', endTime: '12:00' },
              { id: 2, dayOfWeek: 'WEDNESDAY', startTime: '13:00', endTime: '17:00' },
              { id: 3, dayOfWeek: 'FRIDAY', startTime: '10:00', endTime: '15:00' }
            ],
            locations: ['Online', 'University Library', 'Downtown Coffee Shop']
          });
        }
      } catch (err) {
        setError('Failed to load profile data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadTutorProfile();
  }, [currentUser]);
  
  // Handle profile form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };
  
  // Handle tutor data changes
  const handleTutorDataChange = (e) => {
    const { name, value } = e.target;
    setTutorData({
      ...tutorData,
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
  
  // Handle tutor data submission
  const handleTutorDataSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      // In a real app, this would call the API
      // await UserService.updateTutorProfile(tutorData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Tutor information updated successfully');
    } catch (err) {
      setError(err.message || 'Failed to update tutor information');
    } finally {
      setLoading(false);
    }
  };
  
  // Add new subject
  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!newSubject.trim()) return;
    
    if (!tutorData.subjects.includes(newSubject)) {
      setTutorData({
        ...tutorData,
        subjects: [...tutorData.subjects, newSubject]
      });
    }
    
    setNewSubject('');
  };
  
  // Remove subject
  const handleRemoveSubject = (subject) => {
    setTutorData({
      ...tutorData,
      subjects: tutorData.subjects.filter(s => s !== subject)
    });
  };
  
  // Handle availability form changes
  const handleAvailabilityChange = (e) => {
    const { name, value } = e.target;
    setNewAvailability({
      ...newAvailability,
      [name]: value
    });
  };
  
  // Add new availability
  const handleAddAvailability = (e) => {
    e.preventDefault();
    
    // Validate time format
    if (newAvailability.startTime >= newAvailability.endTime) {
      setError('End time must be after start time');
      return;
    }
    
    const newId = tutorData.availability.length > 0 
      ? Math.max(...tutorData.availability.map(a => a.id)) + 1 
      : 1;
    
    setTutorData({
      ...tutorData,
      availability: [
        ...tutorData.availability,
        { ...newAvailability, id: newId }
      ]
    });
    
    // Reset form
    setNewAvailability({
      dayOfWeek: 'MONDAY',
      startTime: '09:00',
      endTime: '17:00'
    });
    
    setError('');
  };
  
  // Remove availability
  const handleRemoveAvailability = (id) => {
    setTutorData({
      ...tutorData,
      availability: tutorData.availability.filter(a => a.id !== id)
    });
  };
  
  // Add new location
  const handleAddLocation = (e) => {
    e.preventDefault();
    if (!newLocation.trim()) return;
    
    if (!tutorData.locations.includes(newLocation)) {
      setTutorData({
        ...tutorData,
        locations: [...tutorData.locations, newLocation]
      });
    }
    
    setNewLocation('');
  };
  
  // Remove location
  const handleRemoveLocation = (location) => {
    setTutorData({
      ...tutorData,
      locations: tutorData.locations.filter(l => l !== location)
    });
  };
  
  // Format day of week for display
  const formatDayOfWeek = (day) => {
    return day.charAt(0) + day.slice(1).toLowerCase();
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
                <p className="text-muted">Tutor</p>
                
                <div className="tutor-stats mt-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span><FontAwesomeIcon icon={faGraduationCap} className="me-2" />Subjects:</span>
                    <Badge bg="primary">{tutorData.subjects.length}</Badge>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span><FontAwesomeIcon icon={faClock} className="me-2" />Availability:</span>
                    <Badge bg="success">{tutorData.availability.length} slots</Badge>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span><FontAwesomeIcon icon={faMoneyBillWave} className="me-2" />Rate:</span>
                    <Badge bg="info">${tutorData.hourlyRate}/hr</Badge>
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
                  <Tab eventKey="tutor" title="Tutor Details" />
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
                        placeholder="Tell students about yourself, your teaching style, and your experience"
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
                
                {activeTab === 'tutor' && (
                  <Form onSubmit={handleTutorDataSubmit}>
                    <Form.Group className="mb-4" controlId="hourlyRate">
                      <Form.Label>Hourly Rate ($)</Form.Label>
                      <Form.Control
                        type="number"
                        name="hourlyRate"
                        value={tutorData.hourlyRate}
                        onChange={handleTutorDataChange}
                        min="1"
                        step="0.01"
                        required
                      />
                      <Form.Text className="text-muted">
                        Set your hourly rate in USD
                      </Form.Text>
                    </Form.Group>
                    
                    <Form.Group className="mb-4" controlId="education">
                      <Form.Label>Education</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        name="education"
                        value={tutorData.education}
                        onChange={handleTutorDataChange}
                        placeholder="List your degrees, certifications, and educational background"
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-4" controlId="experience">
                      <Form.Label>Experience</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        name="experience"
                        value={tutorData.experience}
                        onChange={handleTutorDataChange}
                        placeholder="Describe your teaching experience and relevant work history"
                      />
                    </Form.Group>
                    
                    <hr className="my-4" />
                    
                    <h5 className="mb-3">Subjects</h5>
                    <Row className="mb-4">
                      <Col md={8}>
                        <Form.Group controlId="newSubject">
                          <Form.Label>Add Subject</Form.Label>
                          <div className="d-flex">
                            <Form.Control
                              type="text"
                              value={newSubject}
                              onChange={(e) => setNewSubject(e.target.value)}
                              placeholder="e.g. Mathematics, Physics, Programming"
                            />
                            <Button 
                              variant="outline-primary" 
                              className="ms-2" 
                              onClick={handleAddSubject}
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </Button>
                          </div>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Label>Current Subjects</Form.Label>
                        <ListGroup>
                          {tutorData.subjects.map((subject, index) => (
                            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                              {subject}
                              <Button 
                                variant="outline-danger" 
                                size="sm" 
                                onClick={() => handleRemoveSubject(subject)}
                              >
                                <FontAwesomeIcon icon={faMinus} />
                              </Button>
                            </ListGroup.Item>
                          ))}
                          {tutorData.subjects.length === 0 && (
                            <ListGroup.Item className="text-muted">No subjects added</ListGroup.Item>
                          )}
                        </ListGroup>
                      </Col>
                    </Row>
                    
                    <hr className="my-4" />
                    
                    <h5 className="mb-3">Availability</h5>
                    <Row className="mb-4">
                      <Col md={8}>
                        <Form.Group controlId="newAvailability">
                          <Form.Label>Add Availability</Form.Label>
                          <Row>
                            <Col md={4}>
                              <Form.Group className="mb-2" controlId="dayOfWeek">
                                <Form.Label>Day</Form.Label>
                                <Form.Select
                                  name="dayOfWeek"
                                  value={newAvailability.dayOfWeek}
                                  onChange={handleAvailabilityChange}
                                >
                                  <option value="MONDAY">Monday</option>
                                  <option value="TUESDAY">Tuesday</option>
                                  <option value="WEDNESDAY">Wednesday</option>
                                  <option value="THURSDAY">Thursday</option>
                                  <option value="FRIDAY">Friday</option>
                                  <option value="SATURDAY">Saturday</option>
                                  <option value="SUNDAY">Sunday</option>
                                </Form.Select>
                              </Form.Group>
                            </Col>
                            <Col md={3}>
                              <Form.Group className="mb-2" controlId="startTime">
                                <Form.Label>Start</Form.Label>
                                <Form.Control
                                  type="time"
                                  name="startTime"
                                  value={newAvailability.startTime}
                                  onChange={handleAvailabilityChange}
                                />
                              </Form.Group>
                            </Col>
                            <Col md={3}>
                              <Form.Group className="mb-2" controlId="endTime">
                                <Form.Label>End</Form.Label>
                                <Form.Control
                                  type="time"
                                  name="endTime"
                                  value={newAvailability.endTime}
                                  onChange={handleAvailabilityChange}
                                />
                              </Form.Group>
                            </Col>
                            <Col md={2} className="d-flex align-items-end mb-2">
                              <Button 
                                variant="outline-primary" 
                                onClick={handleAddAvailability}
                                className="w-100"
                              >
                                <FontAwesomeIcon icon={faPlus} />
                              </Button>
                            </Col>
                          </Row>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Label>Current Availability</Form.Label>
                        <ListGroup>
                          {tutorData.availability.map((slot) => (
                            <ListGroup.Item key={slot.id} className="d-flex justify-content-between align-items-center">
                              <div>
                                <span className="fw-bold">{formatDayOfWeek(slot.dayOfWeek)}</span>: {slot.startTime} - {slot.endTime}
                              </div>
                              <Button 
                                variant="outline-danger" 
                                size="sm" 
                                onClick={() => handleRemoveAvailability(slot.id)}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>
                            </ListGroup.Item>
                          ))}
                          {tutorData.availability.length === 0 && (
                            <ListGroup.Item className="text-muted">No availability added</ListGroup.Item>
                          )}
                        </ListGroup>
                      </Col>
                    </Row>
                    
                    <hr className="my-4" />
                    
                    <h5 className="mb-3">Locations</h5>
                    <Row className="mb-4">
                      <Col md={8}>
                        <Form.Group controlId="newLocation">
                          <Form.Label>Add Location</Form.Label>
                          <div className="d-flex">
                            <Form.Control
                              type="text"
                              value={newLocation}
                              onChange={(e) => setNewLocation(e.target.value)}
                              placeholder="e.g. Online, Library, Coffee Shop"
                            />
                            <Button 
                              variant="outline-primary" 
                              className="ms-2" 
                              onClick={handleAddLocation}
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </Button>
                          </div>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Label>Current Locations</Form.Label>
                        <ListGroup>
                          {tutorData.locations.map((location, index) => (
                            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                              <div>
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 text-danger" />
                                {location}
                              </div>
                              <Button 
                                variant="outline-danger" 
                                size="sm" 
                                onClick={() => handleRemoveLocation(location)}
                              >
                                <FontAwesomeIcon icon={faMinus} />
                              </Button>
                            </ListGroup.Item>
                          ))}
                          {tutorData.locations.length === 0 && (
                            <ListGroup.Item className="text-muted">No locations added</ListGroup.Item>
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
                          <><FontAwesomeIcon icon={faSave} className="me-2" />Save Tutor Information</>
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

export default TutorProfilePage;