import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, 
  faUsers, 
  faLightbulb, 
  faHeart,
  faTrophy,
  faGlobe,
  faChalkboardTeacher,
  faUserGraduate
} from '@fortawesome/free-solid-svg-icons';
import MainLayout from '../components/layout/MainLayout';

const AboutPage = () => {
  const stats = [
    { icon: faUsers, number: '10,000+', label: 'Students Helped' },
    { icon: faChalkboardTeacher, number: '500+', label: 'Expert Tutors' },
    { icon: faTrophy, number: '98%', label: 'Success Rate' },
    { icon: faGlobe, number: '50+', label: 'Cities Covered' }
  ];

  const values = [
    {
      icon: faLightbulb,
      title: 'Innovation',
      description: 'We use cutting-edge technology to connect students with the best tutors, making learning more effective and engaging.'
    },
    {
      icon: faHeart,
      title: 'Passion',
      description: 'Our team is passionate about education and committed to helping every student achieve their academic goals.'
    },
    {
      icon: faGraduationCap,
      title: 'Excellence',
      description: 'We maintain the highest standards in tutor selection and platform quality to ensure exceptional learning experiences.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      description: 'Education enthusiast with 15+ years in ed-tech'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      description: 'Tech innovator passionate about learning platforms'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Education',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      description: 'Former teacher with expertise in curriculum design'
    }
  ];

  return (
    <MainLayout>
      <Container className="py-5">
        {/* Hero Section */}
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <h1 className="display-4 fw-bold mb-4">About FindMyTutor</h1>
            <p className="lead text-muted mb-4">
              We're revolutionizing education by connecting students with exceptional tutors 
              who are passionate about teaching and helping students succeed.
            </p>
            <p className="text-muted">
              Founded in 2020, FindMyTutor has grown from a small startup to a leading platform 
              that has helped thousands of students achieve their academic goals through personalized, 
              one-on-one tutoring experiences.
            </p>
          </Col>
        </Row>

        {/* Stats Section */}
        <Row className="mb-5">
          {stats.map((stat, index) => (
            <Col md={3} sm={6} className="mb-4" key={index}>
              <Card className="text-center h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="text-primary mb-3">
                    <FontAwesomeIcon icon={stat.icon} size="3x" />
                  </div>
                  <h3 className="fw-bold text-primary">{stat.number}</h3>
                  <p className="text-muted mb-0">{stat.label}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Mission & Vision */}
        <Row className="mb-5">
          <Col lg={6} className="mb-4">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="text-primary mb-3">
                  <FontAwesomeIcon icon={faLightbulb} size="2x" />
                </div>
                <h4 className="fw-bold">Our Mission</h4>
                <p className="text-muted">
                  To democratize quality education by making personalized tutoring accessible, 
                  affordable, and effective for students worldwide. We believe every student 
                  deserves access to excellent teachers who can help them unlock their potential.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6} className="mb-4">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="text-primary mb-3">
                  <FontAwesomeIcon icon={faGlobe} size="2x" />
                </div>
                <h4 className="fw-bold">Our Vision</h4>
                <p className="text-muted">
                  To become the world's leading platform for personalized education, 
                  where every student can find the perfect tutor to help them succeed 
                  academically and beyond. We envision a future where learning is 
                  personalized, engaging, and accessible to all.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Values Section */}
        <Row className="mb-5">
          <Col className="text-center mb-4">
            <h2 className="fw-bold">Our Core Values</h2>
            <p className="text-muted">The principles that guide everything we do</p>
          </Col>
        </Row>
        <Row>
          {values.map((value, index) => (
            <Col lg={4} className="mb-4" key={index}>
              <Card className="h-100 border-0 shadow-sm text-center">
                <Card.Body className="p-4">
                  <div className="text-primary mb-3">
                    <FontAwesomeIcon icon={value.icon} size="3x" />
                  </div>
                  <h5 className="fw-bold">{value.title}</h5>
                  <p className="text-muted">{value.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Team Section */}
        <Row className="mb-5">
          <Col className="text-center mb-4">
            <h2 className="fw-bold">Meet Our Team</h2>
            <p className="text-muted">The passionate people behind FindMyTutor</p>
          </Col>
        </Row>
        <Row>
          {team.map((member, index) => (
            <Col lg={4} className="mb-4" key={index}>
              <Card className="h-100 border-0 shadow-sm text-center">
                <Card.Body className="p-4">
                  <div className="mb-3">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="rounded-circle"
                      style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    />
                  </div>
                  <h5 className="fw-bold">{member.name}</h5>
                  <p className="text-primary fw-semibold">{member.role}</p>
                  <p className="text-muted small">{member.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* CTA Section */}
        <Row className="mb-5">
          <Col className="text-center">
            <Card className="border-0 shadow-lg bg-primary text-white">
              <Card.Body className="p-5">
                <h3 className="fw-bold mb-3">Ready to Start Your Learning Journey?</h3>
                <p className="lead mb-4">
                  Join thousands of students who have found their perfect tutor on FindMyTutor
                </p>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <Button variant="light" size="lg" href="/student/register">
                    <FontAwesomeIcon icon={faUserGraduate} className="me-2" />
                    Find a Tutor
                  </Button>
                  <Button variant="outline-light" size="lg" href="/tutor/login">
                    <FontAwesomeIcon icon={faChalkboardTeacher} className="me-2" />
                    Become a Tutor
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default AboutPage;
