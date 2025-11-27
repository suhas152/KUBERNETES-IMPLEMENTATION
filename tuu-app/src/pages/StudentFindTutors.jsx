import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Card, Form, InputGroup, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import TutorService from '../services/TutorService';
import MainLayout from '../components/layout/MainLayout';

const TutorCard = ({ tutor, onBook }) => (
  <Card className="h-100 shadow-sm">
    <Card.Body>
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <Card.Title className="mb-1">{tutor.tutor_name || tutor.name}</Card.Title>
          <div className="text-muted mb-2">{tutor.tutor_location || tutor.location || 'Location N/A'}</div>
        </div>
        <Badge bg="info">{tutor.gender || 'N/A'}</Badge>
      </div>
      <div className="small mb-1"><strong>Email:</strong> {tutor.email || '-'}</div>
      <div className="small mb-3"><strong>Mobile:</strong> {tutor.mobileno || '-'}</div>
      <div className="d-grid">
        <Button variant="primary" onClick={() => onBook(tutor)}>Book</Button>
      </div>
    </Card.Body>
  </Card>
);

const StudentFindTutors = ({ onBook }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tutors, setTutors] = useState([]);
  const [q, setQ] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await TutorService.getAllTutors();
        setTutors(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err?.message || 'Failed to load tutors');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const uniqueLocations = useMemo(() => {
    const set = new Set((tutors || []).map(t => t.tutor_location || t.location).filter(Boolean));
    return Array.from(set);
  }, [tutors]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return (tutors || []).filter(t => {
      const name = (t.tutor_name || t.name || '').toLowerCase();
      const loc = (t.tutor_location || t.location || '').toLowerCase();
      const gen = (t.gender || '').toLowerCase();
      if (term && !(name.includes(term) || loc.includes(term))) return false;
      if (gender && gen !== gender.toLowerCase()) return false;
      if (location && loc !== location.toLowerCase()) return false;
      return true;
    });
  }, [tutors, q, gender, location]);

  if (loading) {
    return (
      <MainLayout>
        <Container className="text-center py-5"><Spinner animation="border" /></Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container className="py-4">
        <Row className="mb-3">
          <Col>
            <h2>Find Tutors</h2>
            <p className="text-muted mb-0">Search and filter tutors by name, location, and gender.</p>
          </Col>
        </Row>

        {error && <Alert variant="danger">{error}</Alert>}

        <Card className="mb-4">
          <Card.Body>
            <Row className="g-3">
              <Col md={6}>
                <InputGroup>
                  <InputGroup.Text>Search</InputGroup.Text>
                  <Form.Control placeholder="Name or location" value={q} onChange={(e) => setQ(e.target.value)} />
                </InputGroup>
              </Col>
              <Col md={3}>
                <Form.Select value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="">All Genders</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Col>
              <Col md={3}>
                <Form.Select value={location} onChange={(e) => setLocation(e.target.value)}>
                  <option value="">All Locations</option>
                  {uniqueLocations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Row xs={1} md={2} lg={3} className="g-4">
          {filtered.map(t => (
            <Col key={t.id || t.tid}>
              <TutorCard tutor={t} onBook={onBook || (() => {})} />
            </Col>
          ))}
          {filtered.length === 0 && (
            <Col><Alert variant="info" className="mb-0">No tutors match your filters.</Alert></Col>
          )}
        </Row>
      </Container>
    </MainLayout>
  );
};

export default StudentFindTutors; 