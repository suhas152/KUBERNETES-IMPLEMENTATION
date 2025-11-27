import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Table, Modal } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import StudentService from '../services/StudentService';
import MainLayout from '../components/layout/MainLayout';

const bgStyle = {
  backgroundImage: 'url(https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const StudentProfilePage = () => {
  const { currentUser } = useAuth();
  const [form, setForm] = useState({
    s_id: '',
    name: '',
    username: '',
    password: '',
    email: '',
    ph_no: '',
    address: '',
    Gender: 'Male' // Default to avoid null constraint violation
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Edit student modal state
  const [showEditStudent, setShowEditStudent] = useState(false);
  const [editStudent, setEditStudent] = useState({
    s_id: '',
    name: '',
    username: '',
    password: '',
    email: '',
    ph_no: '',
    address: '',
    Gender: 'Male'
  });

  useEffect(() => {
    if (!currentUser) return;
    // Pre-fill; backend may use s_id or id
    setForm({
      s_id: currentUser.s_id || currentUser.id || '',
      name: currentUser.name || '',
      username: currentUser.username || '',
      password: currentUser.password || '',
      email: currentUser.email || '',
      ph_no: currentUser.ph_no || '',
      address: currentUser.address || '',
      Gender: currentUser.Gender || currentUser.gender || 'Male' // Ensure never null
    });
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      // Validation
      const required = ['name', 'username', 'password', 'email', 'ph_no', 'address'];
      for (const field of required) {
        if (!form[field] || String(form[field]).trim() === '') {
          setError(`Please fill ${field.replace('_', ' ')}`);
          setSaving(false);
          return;
        }
      }
      
      const payload = { ...form };
      // Ensure correct id field expected by backend
      if (!payload.s_id && currentUser?.s_id) payload.s_id = currentUser.s_id;
      // Ensure Gender is never null/empty
      if (!payload.Gender || payload.Gender.trim() === '') {
        setError('Gender is required');
        setSaving(false);
        return;
      }
      
      // Log the payload before sending
      console.log('Final payload being sent:', payload);
      await StudentService.updateStudentProfile(payload);
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError(err?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const openEditStudent = (s) => {
    setEditStudent({
      s_id: s.s_id || s.id,
      name: s.name || '',
      username: s.username || '',
      password: s.password || '',
      email: s.email || '',
      ph_no: s.ph_no || '',
      address: s.address || '',
      Gender: s.Gender || s.gender || 'Male'
    });
    setShowEditStudent(true);
  };

  const handleEditStudentChange = (e) => {
    const { name, value } = e.target;
    setEditStudent(prev => ({ ...prev, [name]: value }));
  };

  const saveEditStudent = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const payload = { ...editStudent };
      // Ensure Gender is never null/empty
      if (!payload.Gender || payload.Gender.trim() === '') payload.Gender = 'Male';
      
      await StudentService.updateStudentProfile(payload);
      setSuccess('Student updated successfully');
      setShowEditStudent(false);
      // Assuming loadAll is a function that reloads the students list
      // loadAll(); 
    } catch (err) {
      setError(err?.response?.data || err?.message || 'Failed to update student');
    }
  };

  return (
    <MainLayout>
      <div style={bgStyle} className="py-5 text-white">
        <Container>
          <h2 className="fw-bold">My Profile</h2>
          <p className="mb-0">Manage your personal information and preferences.</p>
        </Container>
      </div>
      <Container className="py-4">
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Card>
          <Card.Body>
            <Form onSubmit={handleSave}>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Full Name *</Form.Label>
                    <Form.Control name="name" value={form.name} onChange={handleChange} required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Username *</Form.Label>
                    <Form.Control name="username" value={form.username} onChange={handleChange} required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Password *</Form.Label>
                    <Form.Control type="password" name="password" value={form.password} onChange={handleChange} required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Email *</Form.Label>
                    <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Phone *</Form.Label>
                    <Form.Control name="ph_no" value={form.ph_no} onChange={handleChange} required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Gender *</Form.Label>
                    <Form.Select name="Gender" value={form.Gender} onChange={handleChange} required>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Address *</Form.Label>
                    <Form.Control as="textarea" rows={3} name="address" value={form.address} onChange={handleChange} required />
                  </Form.Group>
                </Col>
                <Col md={12} className="d-flex justify-content-end">
                  <Button type="submit" variant="primary" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>

        {/* Edit Student Modal */}
        <Modal show={showEditStudent} onHide={() => setShowEditStudent(false)}>
          <Form onSubmit={saveEditStudent}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Student</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control name="name" value={editStudent.name} onChange={handleEditStudentChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control name="username" value={editStudent.username} onChange={handleEditStudentChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={editStudent.password} onChange={handleEditStudentChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={editStudent.email} onChange={handleEditStudentChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control name="ph_no" value={editStudent.ph_no} onChange={handleEditStudentChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Gender</Form.Label>
                    <Form.Select name="Gender" value={editStudent.Gender} onChange={handleEditStudentChange}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control as="textarea" rows={3} name="address" value={editStudent.address} onChange={handleEditStudentChange} />
                  </Form.Group>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowEditStudent(false)}>Cancel</Button>
              <Button variant="primary" type="submit">Save</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </MainLayout>
  );
};

export default StudentProfilePage; 