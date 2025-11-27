import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-3 mb-md-0">
            <h5>FindMyTutor</h5>
            <p className="text-muted">
              Connecting students with the best tutors for personalized learning experiences.
            </p>
            <div className="social-icons">
              <a href="#" className="text-white me-3">
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
              <a href="#" className="text-white me-3">
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a href="#" className="text-white me-3">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a href="#" className="text-white">
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>
            </div>
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-muted">Home</Link></li>
              <li><Link to="/about" className="text-muted">About Us</Link></li>
              <li><Link to="/tutors" className="text-muted">Find Tutors</Link></li>
              <li><Link to="/become-tutor" className="text-muted">Become a Tutor</Link></li>
              <li><Link to="/contact" className="text-muted">Contact Us</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Info</h5>
            <address className="text-muted">
              <p>123 Education Street</p>
              <p>Learning City, LC 12345</p>
              <p>Email: info@findmytutor.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </Col>
        </Row>
        <hr className="my-4" />
        <Row>
          <Col className="text-center text-muted">
            <p>&copy; {new Date().getFullYear()} FindMyTutor. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;