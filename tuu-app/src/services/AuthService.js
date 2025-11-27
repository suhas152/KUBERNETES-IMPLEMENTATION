import axios from 'axios';

const API_URL = 'http://localhost:2025/';

class AuthService {
  // Login user
  async login(username, password, role) {
    try {
      const response = await axios.post(API_URL + 'login', {
        email,
        password,
        role
      });
      
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Register user
  async register(firstName, lastName, email, password, role) {
    try {
      const response = await axios.post(API_URL + 'register', {
        firstName,
        lastName,
        email,
        password,
        role
      });
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Logout user
  logout() {
    localStorage.removeItem('user');
  }

  // Get current user
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    return JSON.parse(userStr);
  }

  // Check if user is authenticated
  isAuthenticated() {
    const user = this.getCurrentUser();
    // Consider authenticated if a user object exists in localStorage
    // Some flows (e.g., student) may not use JWT tokens
    return !!user;
  }

  // Get user role
  getUserRole() {
    const user = this.getCurrentUser();
    if (!user) return null;
    return user.role;
  }

  // Get auth header
  getAuthHeader() {
    const user = this.getCurrentUser();
    if (user && user.token) {
      return { Authorization: 'Bearer ' + user.token };
    } else {
      return {};
    }
  }

  // Handle API errors
  handleError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const message = error.response.data.message || 'An error occurred';
      console.error('Server error:', error.response);
      return new Error(message);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network error:', error.request);
      return new Error('No response from server. Please try again later.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request error:', error.message);
      return new Error('Error setting up request. Please try again.');
    }
  }
}

export default new AuthService();