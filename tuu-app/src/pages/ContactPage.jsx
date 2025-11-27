import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt, 
  faClock,
  faPaperPlane,
  faHeadset,
  faComments,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';
import MainLayout from '../components/layout/MainLayout';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: faEnvelope,
      title: 'Email Us',
      details: ['support@findmytutor.com', 'info@findmytutor.com'],
      description: 'Send us an email and we\'ll respond within 24 hours'
    },
    {
      icon: faPhone,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      description: 'Monday to Friday, 9 AM to 6 PM EST'
    },
    {
      icon: faMapMarkerAlt,
      title: 'Visit Us',
      details: ['123 Education Street', 'Learning City, LC 12345'],
      description: 'Come visit our headquarters'
    },
    {
      icon: faClock,
      title: 'Business Hours',
      details: ['Mon-Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 4:00 PM'],
      description: 'We\'re here to help during these hours'
    }
  ];

  const faqItems = [
    {
      question: 'How do I find a tutor?',
      answer: 'Simply search for tutors by subject, location, or name using our search feature. You can filter by availability, price range, and ratings to find the perfect match.'
    },
    {
      question: 'What subjects do you cover?',
      answer: 'We cover all major academic subjects including Mathematics, Science, English, History, Languages, and many more. Our tutors are experts in their respective fields.'
    },
    {
      question: 'How much does tutoring cost?',
      answer: 'Tutoring rates vary by tutor and subject. You can view each tutor\'s hourly rate on their profile. We also offer package deals and discounts for multiple sessions.'
    },
    {
      question: 'Is online tutoring available?',
      answer: 'Yes! We offer both in-person and online tutoring options. You can choose your preferred method when booking a session with a tutor.'
    },
    {
      question: 'How do I become a tutor?',
      answer: 'Click on "Become a Tutor" to start the registration process. You\'ll need to provide your qualifications, experience, and pass our verification process.'
    },
    {
      question: 'What if I\'m not satisfied with my tutor?',
      answer: 'We offer a satisfaction guarantee. If you\'re not happy with your tutor, you can request a different one or get a full refund within 24 hours of your session.'
    }
  ];

  return (
    <MainLayout>
      <Container className="py-5">
        {/* Hero Section */}
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <h1 className="display-4 fw-bold mb-4">Contact Us</h1>
            <p className="lead text-muted mb-4">
              We're here to help! Get in touch with our team for any questions, 
              support, or feedback about FindMyTutor.
            </p>
          </Col>
        </Row>

        {/* Contact Information Cards */}
        <Row className="mb-5">
          {contactInfo.map((info, index) => (
            <Col lg={3} md={6} className="mb-4" key={index}>
              <Card className="h-100 border-0 shadow-sm text-center">
                <Card.Body className="p-4">
                  <div className="text-primary mb-3">
                    <FontAwesomeIcon icon={info.icon} size="3x" />
                  </div>
                  <h5 className="fw-bold">{info.title}</h5>
                  {info.details.map((detail, idx) => (
                    <p className="text-muted mb-1" key={idx}>{detail}</p>
                  ))}
                  <p className="small text-muted mt-2">{info.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row>
          {/* Contact Form */}
          <Col lg={8} className="mb-5">
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-primary text-white">
                <h4 className="mb-0">
                  <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                  Send us a Message
                </h4>
              </Card.Header>
              <Card.Body className="p-4">
                {submitStatus === 'success' && (
                  <Alert variant="success" className="mb-4">
                    <FontAwesomeIcon icon={faComments} className="me-2" />
                    Thank you for your message! We'll get back to you within 24 hours.
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Label>Full Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your full name"
                      />
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Label>Email Address *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your email"
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Label>Inquiry Type</Form.Label>
                      <Form.Select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                      >
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="billing">Billing Question</option>
                        <option value="tutor">Tutor Application</option>
                        <option value="feedback">Feedback</option>
                      </Form.Select>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Label>Subject *</Form.Label>
                      <Form.Control
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        placeholder="Brief subject of your inquiry"
                      />
                    </Col>
                  </Row>

                  <div className="mb-4">
                    <Form.Label>Message *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Please provide details about your inquiry..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg"
                    disabled={isSubmitting}
                    className="w-100"
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner size="sm" className="me-2" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* FAQ Section */}
          <Col lg={4}>
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-light">
                <h5 className="mb-0">
                  <FontAwesomeIcon icon={faQuestionCircle} className="me-2" />
                  Frequently Asked Questions
                </h5>
              </Card.Header>
              <Card.Body className="p-0">
                {faqItems.map((faq, index) => (
                  <div key={index} className="border-bottom p-3">
                    <h6 className="fw-bold text-primary mb-2">{faq.question}</h6>
                    <p className="small text-muted mb-0">{faq.answer}</p>
                  </div>
                ))}
              </Card.Body>
            </Card>

            {/* Support Card */}
            <Card className="border-0 shadow-sm mt-4">
              <Card.Body className="text-center p-4">
                <div className="text-primary mb-3">
                  <FontAwesomeIcon icon={faHeadset} size="3x" />
                </div>
                <h5 className="fw-bold">Need Immediate Help?</h5>
                <p className="text-muted mb-3">
                  Our support team is available 24/7 to assist you with any urgent issues.
                </p>
                <Button variant="outline-primary" href="tel:+15551234567">
                  <FontAwesomeIcon icon={faPhone} className="me-2" />
                  Call Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default ContactPage;
