import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, userRole, loading } = useAuth();
  const location = useLocation();

  // Show loading state if auth is still being determined
  if (loading) {
    return <div className="text-center p-5">Loading...</div>;
  }

  // Check if user is authenticated
  if (!isAuthenticated()) {
    // Determine login path based on attempted route prefix
    const path = location.pathname || '';
    let loginPath = '/student/login';
    if (path.startsWith('/tutor')) loginPath = '/tutor/login';
    if (path.startsWith('/admin')) loginPath = '/admin/login';

    // Redirect to appropriate login page with return URL
    return <Navigate to={loginPath} state={{ from: location.pathname }} replace />;
  }

  // If allowedRoles is empty or includes user's role, render the children
  if (allowedRoles.length === 0 || allowedRoles.includes(userRole)) {
    return children;
  }

  // If user doesn't have the required role, redirect to unauthorized page
  return <Navigate to="/unauthorized" replace />;
};

export default ProtectedRoute;