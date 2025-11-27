import axios from 'axios';
import AuthService from './AuthService';

const API_URL = 'http://localhost:2025/user/';

class UserService {
  // Get current user profile
  async getCurrentUserProfile() {
    try {
      const response = await axios.get(
        API_URL + 'profile',
        { headers: AuthService.getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await axios.put(
        API_URL + 'profile',
        profileData,
        { headers: AuthService.getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update user password
  async updatePassword(currentPassword, newPassword) {
    try {
      const response = await axios.put(
        API_URL + 'password',
        { currentPassword, newPassword },
        { headers: AuthService.getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Upload profile picture
  async uploadProfilePicture(formData) {
    try {
      const response = await axios.post(
        API_URL + 'profile/picture',
        formData,
        { 
          headers: {
            ...AuthService.getAuthHeader(),
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Handle API errors
  handleError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const message = error.response.data.message || 'An error occurred';
      return new Error(message);
    } else if (error.request) {
      // The request was made but no response was received
      return new Error('No response from server. Please try again later.');
    } else {
      // Something happened in setting up the request that triggered an Error
      return new Error('Error setting up request. Please try again.');
    }
  }
}

export default new UserService();