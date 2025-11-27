import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Tabs, Tab, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faCamera, faSave, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext';
import UserService from '../services/UserService';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const ProfilePage = () => {
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
  
  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Profile picture state
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  
  // Load user profile data
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setLoading(true);
        // In a real app, this would fetch from the API
        // For now, we'll use the current user data from auth context
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
          
          // Set profile picture if available
          if (currentUser.profilePicture) {
            setPreviewUrl(currentUser.profilePicture);
          }
        }
      } catch (err) {
        setError('Failed to load profile data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadUserProfile();
  }, [currentUser]);
  
  // Handle profile form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };
  
  // Handle password form changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };
  
  // Handle profile picture change
  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
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
  
  // Handle password form submission
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real app, this would call the API
      // await UserService.updatePassword(
      //   passwordData.currentPassword,
      //   passwordData.newPassword
      // );
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Password updated successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError(err.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle profile picture upload
  const handlePictureUpload = async (e) => {
    e.preventDefault();
    if (!profilePicture) return;
    
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      // In a real app, this would call the API
      // const formData = new FormData();
      // formData.append('file', profilePicture);
      // await UserService.uploadProfilePicture(formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Profile picture updated successfully');
    } catch (err) {
      setError(err.message || 'Failed to upload profile picture');
    } finally {
      setLoading(false);
    }
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
                  {previewUrl ? (
                    <Image 
                      src={previewUrl} 
                      roundedCircle 
                      className="profile-image" 
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
                    />
                  ) : (
                    <div className="profile-image-placeholder">
                      <FontAwesomeIcon icon={faUser} size="4x" className="text-secondary" />
                    </div>
                  )}
                </div>
                
                <h4>{profileData.firstName} {profileData.lastName}</h4>
                <p className="text-muted">{userRole?.replace('ROLE_', '')}</p>
                
                <Form onSubmit={handlePictureUpload}>
                  <Form.Group controlId="profilePicture" className="mb-3">
                    <Form.Label className="btn btn-outline-primary btn-sm">
                      <FontAwesomeIcon icon={faCamera} className="me-2" />
                      Change Picture
                      <Form.Control 
                        type="file" 
                        accept="image/*" 
                        onChange={handlePictureChange} 
                        style={{ display: 'none' }} 
                      />
                    </Form.Label>
                  </Form.Group>
                  
                  {profilePicture && (
                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="sm" 
                      disabled={loading}
                    >
                      <FontAwesomeIcon icon={faSave} className="me-2" />
                      Save Picture
                    </Button>
                  )}
                </Form>
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
                  <Tab eventKey="profile" title="Profile Information" />
                  <Tab eventKey="password" title="Change Password" />
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
                
                {activeTab === 'password' && (
                  <Form onSubmit={handlePasswordSubmit}>
                    <Form.Group className="mb-3" controlId="currentPassword">
                      <Form.Label>Current Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="newPassword">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        required
                        minLength={6}
                      />
                      <Form.Text className="text-muted">
                        Password must be at least 6 characters
                      </Form.Text>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="confirmPassword">
                      <Form.Label>Confirm New Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        required
                        minLength={6}
                      />
                    </Form.Group>
                    
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <Button 
                        type="submit" 
                        variant="primary" 
                        disabled={loading}
                      >
                        {loading ? 'Updating...' : (
                          <><FontAwesomeIcon icon={faCheck} className="me-2" />Update Password</>
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

export default ProfilePage;