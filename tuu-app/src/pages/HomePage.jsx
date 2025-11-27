import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import AppNavbar from '../components/layout/Navbar';
import Hero from '../components/layout/Hero';
import Footer from '../components/layout/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faGraduationCap, faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
  // Mock data - in a real app, this would come from an API
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);

  // Mock top tutors data
  const topTutors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      subject: 'Mathematics',
      rating: 4.9,
      hourlyRate: 45,
      location: 'Online & In-person',
      image: 'https://placehold.co/100x100/primary/white?text=SJ',
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      subject: 'Physics',
      rating: 4.8,
      hourlyRate: 50,
      location: 'Online Only',
      image: 'https://placehold.co/100x100/primary/white?text=MC',
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      subject: 'English Literature',
      rating: 4.7,
      hourlyRate: 40,
      location: 'Online & In-person',
      image: 'https://placehold.co/100x100/primary/white?text=ER',
    },
  ];

  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar 
        isAuthenticated={isAuthenticated} 
        userRole={userRole} 
        userName={userName} 
      />
      
      <main className="flex-grow-1">
        <Hero 
          isAuthenticated={isAuthenticated} 
          userRole={userRole} 
          userName={userName} 
        />
        
        {/* Only show top tutors section for guests or customers */}
        {(!isAuthenticated || userRole === 'customer') && (
          <Container className="my-5">
            <h2 className="text-center mb-4">Top-Rated Tutors</h2>
            <Row>
              {topTutors.map(tutor => (
                <Col key={tutor.id} md={4} className="mb-4">
                  <Card className="h-100 shadow-sm hover-card">
                    <Card.Body>
                      <div className="d-flex mb-3">
                        <img 
                          src={tutor.image} 
                          alt={tutor.name} 
                          className="rounded-circle me-3"
                          width="60"
                          height="60"
                        />
                        <div>
                          <Card.Title className="mb-0">{tutor.name}</Card.Title>
                          <div className="text-muted small">
                            <FontAwesomeIcon icon={faGraduationCap} className="me-1" />
                            {tutor.subject}
                          </div>
                          <div className="text-warning">
                            <FontAwesomeIcon icon={faStar} />
                            <span className="ms-1">{tutor.rating}/5</span>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between text-muted small">
                        <div>
                          <FontAwesomeIcon icon={faClock} className="me-1" />
                          ${tutor.hourlyRate}/hour
                        </div>
                        <div>
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="me-1" />
                          {tutor.location}
                        </div>
                      </div>
                    </Card.Body>
                    <Card.Footer className="bg-white border-top-0 text-center">
                      <a href={`/tutors/${tutor.id}`} className="btn btn-outline-primary btn-sm">
                        View Profile
                      </a>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;