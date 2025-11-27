import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import TutorService from '../services/TutorService';
import { useNavigate } from 'react-router-dom';

const TutorList = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadTutors();
  }, []);

  const loadTutors = async () => {
    try {
      const response = await TutorService.getAllTutors();
      setTutors(response);
      setLoading(false);
    } catch (err) {
      setError('Failed to load tutors');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <Container className="py-4">
      <h2 className="mb-4">Available Tutors</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {tutors.map((tutor) => (
          <Col key={tutor.id}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{tutor.username}</Card.Title>
                <Card.Text>
                  <p><strong>Email:</strong> {tutor.email}</p>
                  <p><strong>Gender:</strong> {tutor.gender}</p>
                </Card.Text>
                <Button 
                  variant="primary" 
                  onClick={() => navigate(`/tutor/${tutor.id}`)}
                >
                  View Profile
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TutorList;