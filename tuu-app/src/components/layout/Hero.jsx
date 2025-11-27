import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChalkboardTeacher, faUserGraduate, faCog, faTimes } from '@fortawesome/free-solid-svg-icons';
import TutorService from '../../services/TutorService';

const Hero = ({ isAuthenticated, userRole, userName }) => {
  // Search state management
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchError, setSearchError] = useState('');

  // Search functionality
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchError('');
    
    try {
      const tutors = await TutorService.getAllTutors();
      const filteredTutors = tutors.filter(tutor => {
        const name = (tutor.tutor_name || tutor.name || '').toLowerCase();
        const location = (tutor.tutor_location || tutor.location || '').toLowerCase();
        const query = searchQuery.toLowerCase();
        return name.includes(query) || location.includes(query);
      });
      
      setSearchResults(filteredTutors);
      setShowSearchResults(true);
    } catch (error) {
      setSearchError('Failed to search tutors. Please try again.');
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Close search results modal
  const closeSearchResults = () => {
    setShowSearchResults(false);
    setSearchResults([]);
    setSearchQuery('');
  };
  // Guest hero section
  const GuestHero = () => (
    <div className="bg-primary text-white py-5 hero-section">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-4 mb-lg-0">
            <h1 className="display-4 fw-bold">Find the Best Tutors Near You</h1>
            <p className="lead my-4">
              Connect with qualified tutors for personalized learning experiences. 
              Improve your grades and achieve your academic goals with expert guidance.
            </p>
            <Form className="d-flex bg-white p-2 rounded" onSubmit={handleSearch}>
              <Form.Control
                type="search"
                placeholder="Search by subject, location, or tutor name"
                className="me-2 border-0"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="primary" type="submit" disabled={isSearching}>
                {isSearching ? <Spinner size="sm" /> : <FontAwesomeIcon icon={faSearch} />}
              </Button>
            </Form>
          </Col>
          <Col lg={6}>
            <img 
              src="https://placehold.co/600x400/primary/white?text=Find+Your+Tutor" 
              alt="Find a tutor" 
              className="img-fluid rounded shadow"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );

  // Role-based hero sections
  const AdminHero = () => (
    <div className="bg-light py-4">
      <Container>
        <Row>
          <Col>
            <h2 className="mb-4">Welcome, {userName}!</h2>
            <p className="lead">Manage your platform and monitor activity from your dashboard.</p>
            <Button as={Link} to="/admin/dashboard" variant="primary" className="mt-2">
              Go to Dashboard
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );

  const TutorHero = () => (
    <div className="bg-light py-4">
      <Container>
        <Row>
          <Col>
            <h2 className="mb-4">Welcome, {userName}!</h2>
            <p className="lead">Manage your tutoring profile and bookings from your dashboard.</p>
            <Button as={Link} to="/tutor/dashboard" variant="primary" className="mt-2">
              Go to Dashboard
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );

  const CustomerHero = () => (
    <div className="bg-light py-4">
      <Container>
        <Row>
          <Col>
            <h2 className="mb-4">Welcome, {userName}!</h2>
            <p className="lead">Find tutors and manage your bookings from your dashboard.</p>
            <Form className="d-flex bg-white p-2 rounded shadow-sm mb-4" onSubmit={handleSearch}>
              <Form.Control
                type="search"
                placeholder="Search by subject, location, or tutor name"
                className="me-2 border-0"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="primary" type="submit" disabled={isSearching}>
                {isSearching ? <Spinner size="sm" /> : <FontAwesomeIcon icon={faSearch} />}
              </Button>
            </Form>
            <Button as={Link} to="/customer/dashboard" variant="outline-primary" className="mt-2">
              Go to Dashboard
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );

  // Role highlights section (for guest users)
  const RoleHighlights = () => (
    <Container className="my-5">
      <h2 className="text-center mb-4">How FindMyTutor Works</h2>
      <Row>
        <Col md={4} className="mb-4 mb-md-0">
          <Card className="h-100 shadow-sm hover-card">
            <Card.Body className="text-center p-4">
              <div className="icon-wrapper mb-3">
                <FontAwesomeIcon icon={faChalkboardTeacher} size="3x" className="text-primary" />
              </div>
              <Card.Title>Join as a Tutor</Card.Title>
              <Card.Text>
                Share your knowledge and earn by teaching students in your area of expertise.
              </Card.Text>
              <Button as={Link} to="/tutor/login" variant="outline-primary" className="mt-3">
                Become a Tutor
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4 mb-md-0">
          <Card className="h-100 shadow-sm hover-card">
            <Card.Body className="text-center p-4">
              <div className="icon-wrapper mb-3">
                <FontAwesomeIcon icon={faUserGraduate} size="3x" className="text-primary" />
              </div>
              <Card.Title>Find a Tutor</Card.Title>
              <Card.Text>
                Search for qualified tutors based on subject, location, price, and availability.
              </Card.Text>
              <Button as={Link} to="/student/search-tutors" variant="outline-primary" className="mt-3">
                Find Tutors
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow-sm hover-card">
            <Card.Body className="text-center p-4">
              <div className="icon-wrapper mb-3">
                <FontAwesomeIcon icon={faCog} size="3x" className="text-primary" />
              </div>
              <Card.Title>Manage Platform</Card.Title>
              <Card.Text>
                Admin tools to oversee tutors, students, bookings, and platform analytics.
              </Card.Text>
              <Button as={Link} to="/admin/login" variant="outline-primary" className="mt-3">
                Admin Login
              </Button>
            </Card.Body>
          </Card>
        </Col>

      </Row>
    </Container>
  );

  // Top-rated teachers section
  const TopRatedTeachers = () => {
    const [topTeachers, setTopTeachers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const loadTopTeachers = async () => {
        try {
          const tutors = await TutorService.getAllTutors();
          // Sort by rating (assuming we have a rating field) or by name for demo
          const sortedTutors = tutors
            .sort((a, b) => (b.rating || 0) - (a.rating || 0))
            .slice(0, 6); // Get top 6 teachers
          setTopTeachers(sortedTutors);
        } catch (error) {
          console.error('Error loading top teachers:', error);
        } finally {
          setLoading(false);
        }
      };
      loadTopTeachers();
    }, []);

    if (loading) {
      return (
        <Container className="my-5">
          <h2 className="text-center mb-4">Top-Rated Teachers</h2>
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        </Container>
      );
    }

    return (
      <Container className="my-5">
        <h2 className="text-center mb-4">Top-Rated Teachers</h2>
        <p className="text-center text-muted mb-5">
          Meet our most highly-rated and experienced tutors
        </p>
        <Row xs={1} md={2} lg={3} className="g-4">
          {topTeachers.map((teacher, index) => (
            <Col key={teacher.id || teacher.tid || index}>
              <Card className="h-100 shadow-sm hover-card">
                <Card.Body className="text-center p-4">
                  <div className="mb-3">
                    <div className="teacher-avatar bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center" 
                         style={{width: '80px', height: '80px', fontSize: '1.5rem'}}>
                      {(teacher.tutor_name || teacher.name || 'T').charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <Card.Title className="h5 mb-2">
                    {teacher.tutor_name || teacher.name || 'Teacher Name'}
                  </Card.Title>
                  <div className="text-muted small mb-2">
                    <FontAwesomeIcon icon={faChalkboardTeacher} className="me-1" />
                    {teacher.tutor_location || teacher.location || 'Location N/A'}
                  </div>
                  <div className="mb-3">
                    <div className="d-flex justify-content-center align-items-center">
                      <span className="text-warning me-1">
                        {'★'.repeat(5)}
                      </span>
                      <span className="small text-muted">
                        ({teacher.rating || '4.8'})
                      </span>
                    </div>
                  </div>
                  <div className="small text-muted mb-3">
                    <strong>Subjects:</strong> {teacher.subjects || 'Mathematics, Science'}
                  </div>
                  <div className="small text-muted mb-3">
                    <strong>Experience:</strong> {teacher.experience || '5+ years'}
                  </div>
                  <Button as={Link} to="/student/search-tutors" variant="outline-primary" size="sm">
                    View Profile
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="text-center mt-4">
          <Button as={Link} to="/student/search-tutors" variant="primary">
            View All Teachers
          </Button>
        </div>
      </Container>
    );
  };

  // Render appropriate hero section based on authentication status and role
  const renderHero = () => {
    if (!isAuthenticated) {
      return (
        <>
          <GuestHero />
          <RoleHighlights />
          <TopRatedTeachers />
        </>
      );
    }

    switch (userRole?.toLowerCase()) {
      case 'admin':
        return <AdminHero />;
      case 'tutor':
        return <TutorHero />;
      case 'customer':
        return <CustomerHero />;
      default:
        return <GuestHero />;
    }
  };

  // Search Results Modal Component
  const SearchResultsModal = () => (
    <Modal show={showSearchResults} onHide={closeSearchResults} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Search Results for "{searchQuery}"
          {searchResults.length > 0 && (
            <span className="text-muted ms-2">({searchResults.length} found)</span>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {searchError && (
          <Alert variant="danger" className="mb-3">
            {searchError}
          </Alert>
        )}
        
        {searchResults.length === 0 && !searchError ? (
          <Alert variant="info" className="mb-0">
            No tutors found matching your search criteria.
          </Alert>
        ) : (
          <Row xs={1} md={2} className="g-3">
            {searchResults.map((tutor) => (
              <Col key={tutor.id || tutor.tid}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <Card.Title className="mb-1 h6">
                        {tutor.tutor_name || tutor.name || 'Name N/A'}
                      </Card.Title>
                      <small className="text-muted">
                        {tutor.gender || 'N/A'}
                      </small>
                    </div>
                    <div className="small text-muted mb-2">
                      <strong>Location:</strong> {tutor.tutor_location || tutor.location || 'N/A'}
                    </div>
                    <div className="small text-muted mb-2">
                      <strong>Email:</strong> {tutor.email || 'N/A'}
                    </div>
                    <div className="small text-muted mb-3">
                      <strong>Mobile:</strong> {tutor.mobileno || 'N/A'}
                    </div>
                    <div className="d-grid gap-2">
                      <Button 
                        as={Link} 
                        to="/student/search-tutors" 
                        variant="primary" 
                        size="sm"
                        onClick={closeSearchResults}
                      >
                        View Profile
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeSearchResults}>
          Close
        </Button>
        <Button as={Link} to="/student/search-tutors" variant="primary" onClick={closeSearchResults}>
          View All Tutors
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <>
      <style jsx>{`
        .hover-card {
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
        }
        .teacher-avatar {
          font-weight: bold;
          background: linear-gradient(135deg, #007bff, #0056b3) !important;
        }
      `}</style>
      {renderHero()}
      <SearchResultsModal />
    </>
  );
};

export default Hero;