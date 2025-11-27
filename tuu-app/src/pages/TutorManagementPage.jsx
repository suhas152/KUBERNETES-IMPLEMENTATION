import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Modal, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import TutorService from '../services/TutorService.js';
import { useAuth } from '../contexts/AuthContext';
import Tutor from '../models/Tutor';

const TutorManagementPage = () => {
  const { currentUser } = useAuth();
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState(new Tutor());
  const [selectedTutorId, setSelectedTutorId] = useState(null);
  
  // Load tutors on component mount
  useEffect(() => {
    fetchTutors();
  }, []);
  
  const fetchTutors = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await TutorService.getAllTutors();
      setTutors(data);
    } catch (err) {
      setError('Failed to load tutors. ' + err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const resetForm = () => {
    setFormData(new Tutor());
    setError('');
    setSuccess('');
  };
  
  const handleAddTutor = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await TutorService.addTutor(formData);
      setSuccess('Tutor added successfully!');
      setShowAddModal(false);
      resetForm();
      fetchTutors();
    } catch (err) {
      setError('Failed to add tutor. ' + err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleEditTutor = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await TutorService.updateTutorProfile(formData);
      setSuccess('Tutor updated successfully!');
      setShowEditModal(false);
      resetForm();
      fetchTutors();
    } catch (err) {
      setError('Failed to update tutor. ' + err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteTutor = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await TutorService.deleteTutor(selectedTutorId);
      setSuccess('Tutor deleted successfully!');
      setShowDeleteModal(false);
      fetchTutors();
    } catch (err) {
      setError('Failed to delete tutor. ' + err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const openEditModal = (tutor) => {
    setFormData(tutor);
    setShowEditModal(true);
  };
  
  const openDeleteModal = (tutorId) => {
    setSelectedTutorId(tutorId);
    setShowDeleteModal(true);
  };
  
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1">
        <Container className="py-4">
          <h1 className="mb-4">Tutor Management</h1>
          
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          
          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Tutors</h5>
              <Button variant="primary" onClick={() => { resetForm(); setShowAddModal(true); }}>
                <FontAwesomeIcon icon={faPlus} /> Add Tutor
              </Button>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <Table responsive striped hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Contact</th>
                      <th>Qualification</th>
                      <th>Experience</th>
                      <th>Hourly Rate</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tutors.length > 0 ? (
                      tutors.map((tutor) => (
                        <tr key={tutor.tid}>
                          <td>{tutor.tid}</td>
                          <td>{tutor.username}</td>
                          <td>{tutor.email}</td>
                          <td>{tutor.contactno}</td>
                          <td>{tutor.qualification}</td>
                          <td>{tutor.experience}</td>
                          <td>${tutor.hourlyrate}/hr</td>
                          <td>
                            <Button variant="outline-primary" size="sm" className="me-2" onClick={() => openEditModal(tutor)}>
                              <FontAwesomeIcon icon={faEdit} />
                            </Button>
                            <Button variant="outline-danger" size="sm" onClick={() => openDeleteModal(tutor.tid)}>
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">No tutors found</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Container>
      </div>
      
      {/* Add Tutor Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Tutor</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddTutor}>
          <Modal.Body>
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
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Subjects (comma separated)</Form.Label>
              <Form.Control 
                type="text" 
                name="subjects" 
                value={formData.subjects} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Tutor'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      
      {/* Edit Tutor Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Tutor</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditTutor}>
          <Modal.Body>
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
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    required 
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="contactno" 
                    value={formData.contactno} 
                    onChange={handleInputChange} 
                    required 
                  />
                </Form.Group>
              </Col>
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
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Subjects (comma separated)</Form.Label>
              <Form.Control 
                type="text" 
                name="subjects" 
                value={formData.subjects} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Tutor'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      
      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this tutor? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteTutor} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TutorManagementPage;