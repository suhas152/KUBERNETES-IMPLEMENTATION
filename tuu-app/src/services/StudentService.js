import axios from 'axios';

const API_URL = 'http://localhost:2025/student/';

class StudentService {
  // Register student
  async register(studentData) {
    try {
      // Make sure all required fields are present
      const requiredFields = ['username', 'password', 'name', 'gender', 'email', 'ph_no', 'address'];
      for (const field of requiredFields) {
        if (!studentData[field]) {
          throw new Error(`${field.replace('_', ' ')} is required`);
        }
      }

      console.log('Sending registration data:', studentData); // For debugging
      const response = await axios.post(API_URL + 'register', studentData);
      console.log('Registration response:', response); // For debugging
      return response.data;
    } catch (error) {
      console.error('Registration error in service:', error.response?.data || error); // For debugging
      throw this.handleError(error);
    }
  }

  // Login student
  async login(username, password) {
    try {
      const response = await axios.get(API_URL + 'login', {
        params: { username, password }
      });
      if (response.data) {
        // Add role to the response data
        const userData = {
          ...response.data,
          role: 'STUDENT'
        };
        localStorage.setItem('student', JSON.stringify(userData));
        return userData;
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get student by ID
  async getStudentById(id) {
    try {
      const response = await axios.get(API_URL + `view/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update student profile
  async updateStudentProfile(student) {
    try {
      const response = await axios.put(API_URL + 'update', student);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      // Log the full error response for debugging
      console.error('Full error response:', error.response);
      const errorMessage = error.response.data?.message || error.response.data || 'An error occurred';
      throw new Error(errorMessage);
    }
    console.error('Network or other error:', error);
    throw error;
  }
}

export default new StudentService();