import axios from 'axios';
import AuthService from './AuthService';

const API_URL = 'http://localhost:2025/tutor';

class TutorService {
  // Get all tutors
  async getAllTutors() {
    try {
      const response = await axios.get(`${API_URL}/viewall`);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Get a specific tutor by ID
  async getTutorById(id) {
    try {
      const response = await axios.get(`${API_URL}/view/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Login tutor
  async login(username, password) {
    try {
      const response = await axios.get(
        `${API_URL}/login?username=${username}&password=${password}`
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Update tutor profile
  async updateTutorProfile(tutor) {
    try {
      const response = await axios.put(
        `${API_URL}/update`,
        tutor,
        { headers: AuthService.getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Add a new tutor
  async addTutor(tutor) {
    try {
      const response = await axios.post(
        `${API_URL}/add`,
        tutor
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Delete a tutor
  async deleteTutor(id) {
    try {
      const response = await axios.delete(
        `${API_URL}/delete/${id}`,
        { headers: AuthService.getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Get bookings for a tutor
  async getTutorBookings(tutorId) {
    try {
      const response = await axios.get(`${API_URL}/${tutorId}/bookings`);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Handle errors
  handleError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response error:', error.response.data);
      console.error('Status code:', error.response.status);
      
      // If token is expired or invalid, redirect to login
      if (error.response.status === 401) {
        AuthService.logout();
        window.location.href = '/login';
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
    }
  }
}

export default new TutorService();