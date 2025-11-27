import React, { useState, useEffect, useRef } from 'react';
import { Dropdown, Badge, ListGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import NotificationService from '../../services/NotificationService';
import './NotificationDropdown.css';

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch notifications when component mounts
  useEffect(() => {
    fetchNotifications();
    // Set up polling for notifications every minute
    const intervalId = setInterval(() => {
      fetchUnreadCount();
    }, 60000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch all notifications
  const fetchNotifications = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await NotificationService.getMyNotifications();
      setNotifications(data);
      setUnreadCount(data.filter(notification => !notification.read).length);
    } catch (err) {
      setError('Failed to load notifications');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch only unread count (for polling)
  const fetchUnreadCount = async () => {
    try {
      const data = await NotificationService.getUnreadCount();
      setUnreadCount(data.count);
    } catch (err) {
      console.error('Failed to fetch unread count:', err);
    }
  };

  // Mark a notification as read
  const markAsRead = async (id, event) => {
    event.stopPropagation();
    try {
      await NotificationService.markAsRead(id);
      setNotifications(notifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      ));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await NotificationService.markAllAsRead();
      setNotifications(notifications.map(notification => ({ ...notification, read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error('Failed to mark all notifications as read:', err);
    }
  };

  // Delete a notification
  const deleteNotification = async (id, event) => {
    event.stopPropagation();
    try {
      await NotificationService.deleteNotification(id);
      const updatedNotifications = notifications.filter(notification => notification.id !== id);
      setNotifications(updatedNotifications);
      setUnreadCount(updatedNotifications.filter(notification => !notification.read).length);
    } catch (err) {
      console.error('Failed to delete notification:', err);
    }
  };

  // Format notification timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} min ago`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hr ago`;
    } else if (diffInSeconds < 604800) {
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Handle notification click
  const handleNotificationClick = (notification) => {
    // If not already read, mark as read
    if (!notification.read) {
      markAsRead(notification.id, { stopPropagation: () => {} });
    }
    
    // Navigate to the relevant page based on notification type
    if (notification.link) {
      window.location.href = notification.link;
    }
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    if (!show) {
      fetchNotifications(); // Refresh notifications when opening
    }
    setShow(!show);
  };

  return (
    <div className="notification-dropdown" ref={dropdownRef}>
      <div className="notification-bell" onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faBell} size="lg" />
        {unreadCount > 0 && (
          <Badge pill bg="danger" className="notification-badge">
            {unreadCount > 99 ? '99+' : unreadCount}
          </Badge>
        )}
      </div>

      {show && (
        <div className="notification-menu">
          <div className="notification-header">
            <h6>Notifications</h6>
            {notifications.length > 0 && (
              <Button 
                variant="link" 
                size="sm" 
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
              >
                Mark all as read
              </Button>
            )}
          </div>

          {isLoading ? (
            <div className="notification-loading">Loading...</div>
          ) : error ? (
            <div className="notification-error">{error}</div>
          ) : notifications.length === 0 ? (
            <div className="notification-empty">No notifications</div>
          ) : (
            <ListGroup className="notification-list">
              {notifications.map(notification => (
                <ListGroup.Item 
                  key={notification.id} 
                  className={`notification-item ${!notification.read ? 'unread' : ''}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="notification-content">
                    <div className="notification-message">{notification.message}</div>
                    <div className="notification-time">{formatTime(notification.createdAt)}</div>
                  </div>
                  <div className="notification-actions">
                    {!notification.read && (
                      <Button 
                        variant="light" 
                        size="sm" 
                        className="action-btn"
                        onClick={(e) => markAsRead(notification.id, e)}
                        title="Mark as read"
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </Button>
                    )}
                    <Button 
                      variant="light" 
                      size="sm" 
                      className="action-btn"
                      onClick={(e) => deleteNotification(notification.id, e)}
                      title="Delete"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;