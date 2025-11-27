import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Alert, Spinner, Badge, Form, Modal } from 'react-bootstrap';
import AdminService from '../services/AdminService';
import BookingService from '../services/BookingService';
import TutorService from '../services/TutorService';
import MainLayout from '../components/layout/MainLayout';

const StatusBadge = ({ status }) => {
  const s = (status || '').toLowerCase();
  const variant = s === 'confirmed' ? 'success' : s === 'canceled' ? 'danger' : 'secondary';
  return <Badge bg={variant} className="text-uppercase">{status || 'PENDING'}</Badge>;
};

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [tutors, setTutors] = useState([]);
  const [students, setStudents] = useState([]);
  const [bookings, setBookings] = useState([]);

  // New tutor form state (fields aligned with backend Tutor model)
  const [newTutor, setNewTutor] = useState({
    gender: '',
    email: '',
    username: '',
    password: '',
    mobileno: '',
    tutor_name: '',
    tutor_location: ''
  });

  // Edit modal state
  const [showEdit, setShowEdit] = useState(false);
  const [editTutor, setEditTutor] = useState({
    id: '',
    gender: '',
    email: '',
    username: '',
    password: '',
    mobileno: '',
    tutor_name: '',
    tutor_location: ''
  });

  const loadAll = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      const [tut, stu, boo] = await Promise.all([
        AdminService.getTutors(),
        AdminService.getStudents(),
        BookingService.adminGetAllBookings()
      ]);
      setTutors(tut || []);
      setStudents(stu || []);
      setBookings(boo || []);
    } catch (err) {
      setError(err?.message || 'Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleDeleteTutor = async (tid) => {
    if (!window.confirm('Delete this tutor?')) return;
    await AdminService.deleteTutor(tid);
    loadAll();
  };

  const handleDeleteStudent = async (sid) => {
    if (!window.confirm('Delete this student?')) return;
    await AdminService.deleteStudent(sid);
    loadAll();
  };

  const updateBookingStatus = async (bookingId, action) => {
    try {
      const map = { ACCEPT: 'CONFIRMED', REJECT: 'CANCELED', PENDING: 'PENDING' };
      await BookingService.updateBookingStatus(bookingId, map[action]);
      setSuccess('Booking updated successfully');
      loadAll();
    } catch (err) {
      const serverMsg = err?.response?.data?.message || err?.response?.data || err?.message;
      alert(serverMsg || 'Failed to update booking');
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm('Delete this booking?')) return;
    await BookingService.adminDeleteBooking(bookingId);
    loadAll();
  };

  const handleNewTutorChange = (e) => {
    const { name, value } = e.target;
    setNewTutor(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTutor = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      // Basic validation
      const required = ['gender','email','username','password','mobileno','tutor_name','tutor_location'];
      for (const field of required) {
        if (!newTutor[field] || String(newTutor[field]).trim() === '') {
          setError(`Please fill ${field.replace('_', ' ')}`);
          return;
        }
      }
      const result = await AdminService.addTutor(newTutor);
      setSuccess(typeof result === 'string' ? result : 'Tutor added successfully');
      // Reset form
      setNewTutor({ gender: '', email: '', username: '', password: '', mobileno: '', tutor_name: '', tutor_location: '' });
      // Refresh data
      loadAll();
    } catch (err) {
      setError(err?.response?.data || err?.message || 'Failed to add tutor');
    }
  };

  const openEdit = (t) => {
    setEditTutor({
      id: t.id || t.tid,
      gender: t.gender || '',
      email: t.email || '',
      username: t.username || '',
      password: t.password || '',
      mobileno: t.mobileno || '',
      tutor_name: t.tutor_name || t.name || '',
      tutor_location: t.tutor_location || t.location || ''
    });
    setShowEdit(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditTutor(prev => ({ ...prev, [name]: value }));
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const payload = { ...editTutor };
      // Backend expects id named as `id`
      await TutorService.updateTutorProfile(payload);
      setSuccess('Tutor updated successfully');
      setShowEdit(false);
      loadAll();
    } catch (err) {
      setError(err?.response?.data || err?.message || 'Failed to update tutor');
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <Container className="text-center py-5">
          <Spinner animation="border" />
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container className="py-4">
        <Row className="mb-3">
          <Col>
            <h2>Admin Dashboard</h2>
            <p className="text-muted mb-0">Manage tutors, students, and bookings.</p>
          </Col>
        </Row>

        {error && (
          <Alert variant="danger">{error}</Alert>
        )}
        {success && (
          <Alert variant="success">{success}</Alert>
        )}

        {/* Actions Section */}
        <Row className="g-4 mb-4">
          <Col md={12}>
            <Card>
              <Card.Header>
                <strong>Actions</strong>
              </Card.Header>
              <Card.Body>
                <h5 className="mb-3">Register New Tutor</h5>
                <Form onSubmit={handleAddTutor}>
                  <Row className="g-3">
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control name="tutor_name" value={newTutor.tutor_name} onChange={handleNewTutorChange} placeholder="e.g., John Doe" />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control name="username" value={newTutor.username} onChange={handleNewTutorChange} placeholder="e.g., johndoe" />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" value={newTutor.password} onChange={handleNewTutorChange} placeholder="••••••••" />
                      </Form.Group>
                    </Col>

                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={newTutor.email} onChange={handleNewTutorChange} placeholder="name@example.com" />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Mobile No</Form.Label>
                        <Form.Control name="mobileno" value={newTutor.mobileno} onChange={handleNewTutorChange} placeholder="e.g., 9876543210" />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Gender</Form.Label>
                        <Form.Select name="gender" value={newTutor.gender} onChange={handleNewTutorChange}>
                          <option value="">Select gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Location</Form.Label>
                        <Form.Control name="tutor_location" value={newTutor.tutor_location} onChange={handleNewTutorChange} placeholder="e.g., Hyderabad" />
                      </Form.Group>
                    </Col>

                    <Col md={12} className="d-flex justify-content-end">
                      <Button type="submit" variant="primary">Add Tutor</Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="g-4">
          <Col md={12}>
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <strong>Tutors</strong>
                <div>Count: {tutors.length}</div>
              </Card.Header>
              <Card.Body className="p-0">
                <Table responsive hover className="mb-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Gender</th>
                      <th>Location</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tutors.map(t => (
                      <tr key={t.id || t.tid}>
                        <td>{t.id || t.tid}</td>
                        <td>{t.tutor_name || t.name}</td>
                        <td>{t.username || '-'}</td>
                        <td>{t.email || '-'}</td>
                        <td>{t.mobileno || '-'}</td>
                        <td>{t.gender || '-'}</td>
                        <td>{t.tutor_location || t.location || '-'}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button variant="secondary" size="sm" onClick={() => openEdit(t)}>Edit</Button>
                            <Button variant="danger" size="sm" onClick={() => handleDeleteTutor(t.id || t.tid)}>Delete</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {tutors.length === 0 && (
                      <tr><td colSpan={8} className="text-center py-3">No tutors found</td></tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          <Col md={12}>
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <strong>Students</strong>
                <div>Count: {students.length}</div>
              </Card.Header>
              <Card.Body className="p-0">
                <Table responsive hover className="mb-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(s => (
                      <tr key={s.id || s.sid}>
                        <td>{s.id || s.sid}</td>
                        <td>{s.name}</td>
                        <td>{s.username || '-'}</td>
                        <td>{s.email || '-'}</td>
                        <td>
                          <Button variant="danger" size="sm" onClick={() => handleDeleteStudent(s.id || s.sid)}>Delete</Button>
                        </td>
                      </tr>
                    ))}
                    {students.length === 0 && (
                      <tr><td colSpan={5} className="text-center py-3">No students found</td></tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          <Col md={12}>
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <strong>Bookings</strong>
                <div>Count: {bookings.length}</div>
              </Card.Header>
              <Card.Body className="p-0">
                <Table responsive hover className="mb-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Student</th>
                      <th>Tutor</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(b => (
                      <tr key={b.id || b.bookingId}>
                        <td>{b.id || b.bookingId}</td>
                        <td>{b.student?.name || b.studentName || '-'}</td>
                        <td>{b.tutor?.tutor_name || b.tutor?.name || b.tutorName || '-'}</td>
                        <td>{b.bookingDateTime || b.date || '-'}</td>
                        <td><StatusBadge status={b.status} /></td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button size="sm" variant="success" onClick={() => updateBookingStatus(b.id || b.bookingId, 'ACCEPT')}>Accept</Button>
                            <Button size="sm" variant="secondary" onClick={() => updateBookingStatus(b.id || b.bookingId, 'PENDING')}>Set Pending</Button>
                            <Button size="sm" variant="danger" onClick={() => updateBookingStatus(b.id || b.bookingId, 'REJECT')}>Cancel</Button>
                            <Button size="sm" variant="outline-danger" onClick={() => handleDeleteBooking(b.id || b.bookingId)}>Delete</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {bookings.length === 0 && (
                      <tr><td colSpan={6} className="text-center py-3">No bookings found</td></tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Edit Tutor Modal */}
        <Modal show={showEdit} onHide={() => setShowEdit(false)}>
          <Form onSubmit={saveEdit}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Tutor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control name="tutor_name" value={editTutor.tutor_name} onChange={handleEditChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control name="username" value={editTutor.username} onChange={handleEditChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={editTutor.password} onChange={handleEditChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={editTutor.email} onChange={handleEditChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Mobile No</Form.Label>
                    <Form.Control name="mobileno" value={editTutor.mobileno} onChange={handleEditChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Gender</Form.Label>
                    <Form.Select name="gender" value={editTutor.gender} onChange={handleEditChange}>
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Location</Form.Label>
                    <Form.Control name="tutor_location" value={editTutor.tutor_location} onChange={handleEditChange} />
                  </Form.Group>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowEdit(false)}>Cancel</Button>
              <Button variant="primary" type="submit">Save</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </MainLayout>
  );
};

export default AdminDashboard; 