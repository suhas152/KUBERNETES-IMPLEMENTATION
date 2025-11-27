import React, { createContext, useState, useEffect, useContext } from 'react';
import AuthService from '../services/AuthService';

const AuthContext = createContext();

const useAuthProvider = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const user = AuthService.getCurrentUser();
      if (user) {
        setCurrentUser(user);
        const storedRole = user.role || localStorage.getItem('role');
        if (storedRole) setUserRole(storedRole);
      } else {
        const storedRole = localStorage.getItem('role');
        if (storedRole) setUserRole(storedRole);
      }
    } catch (err) {
      console.error('Error loading user:', err);
      setError('Failed to load user data');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (userData, role) => {
    setLoading(true);
    setError(null);
    try {
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('role', role);
      setCurrentUser(userData);
      setUserRole(role);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await AuthService.register(formData);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();
    setCurrentUser(null);
    setUserRole(null);
  };

  const clearError = () => setError(null);

  const checkAuthentication = () => {
    return !!currentUser && !!userRole && AuthService.isAuthenticated();
  };

  return {
    currentUser,
    userRole,
    loading,
    error,
    login,
    logout,
    register,
    clearError,
    isAuthenticated: checkAuthentication
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;