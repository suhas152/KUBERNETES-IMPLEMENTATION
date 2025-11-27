import React, { useState, useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faInfoCircle, faCheckCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import './NotificationToast.css';

const NotificationToast = ({ notification, onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Auto-hide toast after 5 seconds
    const timer = setTimeout(() => {
      setShow(false);
      if (onClose) onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setShow(false);
    if (onClose) onClose();
  };

  // Determine icon based on notification type
  const getIcon = () => {
    switch (notification.type) {
      case 'info':
        return faInfoCircle;
      case 'success':
        return faCheckCircle;
      case 'warning':
      case 'error':
        return faExclamationTriangle;
      default:
        return faBell;
    }
  };

  // Determine background color based on notification type
  const getVariant = () => {
    switch (notification.type) {
      case 'info':
        return 'info';
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'danger';
      default:
        return 'primary';
    }
  };

  return (
    <Toast 
      show={show} 
      onClose={handleClose} 
      className={`notification-toast ${notification.type}`}
      bg={getVariant()}
    >
      <Toast.Header closeButton>
        <FontAwesomeIcon icon={getIcon()} className="me-2" />
        <strong className="me-auto">{notification.title || 'Notification'}</strong>
        <small>{notification.time || 'Just now'}</small>
      </Toast.Header>
      <Toast.Body className="text-white">
        {notification.message}
        {notification.link && (
          <div className="mt-2">
            <a 
              href={notification.link} 
              className="text-white text-decoration-underline"
              onClick={(e) => {
                e.preventDefault();
                handleClose();
                window.location.href = notification.link;
              }}
            >
              View details
            </a>
          </div>
        )}
      </Toast.Body>
    </Toast>
  );
};

// Container component to manage multiple toasts
export const NotificationToastContainer = ({ notifications, onClose }) => {
  return (
    <ToastContainer className="notification-toast-container" position="top-end">
      {notifications.map((notification) => (
        <NotificationToast 
          key={notification.id} 
          notification={notification} 
          onClose={() => onClose(notification.id)} 
        />
      ))}
    </ToastContainer>
  );
};

export default NotificationToast;