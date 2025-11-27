import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faInfoCircle, faCheckCircle, faExclamationTriangle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { useNotifications } from '../contexts/NotificationContext';
import MainLayout from '../components/layout/MainLayout';

const NotificationTestPage = () => {
  const { showToast, addNotification } = useNotifications();
  
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'info',
    hasLink: false,
    link: '/'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmitToast = (e) => {
    e.preventDefault();
    
    showToast({
      title: formData.title || 'Notification',
      message: formData.message,
      type: formData.type,
      link: formData.hasLink ? formData.link : null
    });
  };

  const handleSubmitNotification = (e) => {
    e.preventDefault();
    
    addNotification({
      id: Date.now().toString(),
      message: formData.message,
      type: formData.type,
      link: formData.hasLink ? formData.link : null,
      read: false,
      createdAt: new Date().toISOString()
    });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'info':
        return faInfoCircle;
      case 'success':
        return faCheckCircle;
      case 'warning':
        return faExclamationTriangle;
      case 'error':
        return faExclamationCircle;
      default:
        return faBell;
    }
  };

  return (
    <MainLayout>
      <Container className="py-5">
        <h1 className="mb-4">Notification Test Page</h1>
        <p className="lead mb-4">
          Use this page to test the notification system. You can create toast notifications 
          or add notifications to the dropdown in the navbar.
        </p>

        <Row>
          <Col md={6} className="mb-4">
            <Card>
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">Create Toast Notification</h5>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmitToast}>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Notification Title"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Notification Message"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Type</Form.Label>
                    <Form.Select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                    >
                      <option value="info">Info</option>
                      <option value="success">Success</option>
                      <option value="warning">Warning</option>
                      <option value="error">Error</option>
                      <option value="default">Default</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Include Link"
                      name="hasLink"
                      checked={formData.hasLink}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  {formData.hasLink && (
                    <Form.Group className="mb-3">
                      <Form.Label>Link URL</Form.Label>
                      <Form.Control
                        type="text"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        placeholder="/path/to/page"
                      />
                    </Form.Group>
                  )}

                  <Button variant="primary" type="submit">
                    Show Toast Notification
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card>
              <Card.Header className="bg-info text-white">
                <h5 className="mb-0">Add to Notification Dropdown</h5>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmitNotification}>
                  <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Notification Message"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Type</Form.Label>
                    <Form.Select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                    >
                      <option value="info">Info</option>
                      <option value="success">Success</option>
                      <option value="warning">Warning</option>
                      <option value="error">Error</option>
                      <option value="default">Default</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Include Link"
                      name="hasLink"
                      checked={formData.hasLink}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  {formData.hasLink && (
                    <Form.Group className="mb-3">
                      <Form.Label>Link URL</Form.Label>
                      <Form.Control
                        type="text"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        placeholder="/path/to/page"
                      />
                    </Form.Group>
                  )}

                  <Button variant="info" type="submit" className="text-white">
                    Add to Notification Dropdown
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            <Card className="mt-4">
              <Card.Header className="bg-secondary text-white">
                <h5 className="mb-0">Preview</h5>
              </Card.Header>
              <Card.Body>
                <Alert variant={formData.type === 'error' ? 'danger' : formData.type}>
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon 
                      icon={getTypeIcon(formData.type)} 
                      className="me-2" 
                      size="lg" 
                    />
                    <div>
                      <div className="fw-bold">{formData.title || 'Notification'}</div>
                      <div>{formData.message || 'Your notification message will appear here'}</div>
                      {formData.hasLink && (
                        <div className="mt-2">
                          <a href={formData.link}>View details</a>
                        </div>
                      )}
                    </div>
                  </div>
                </Alert>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default NotificationTestPage;