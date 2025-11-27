import axios from 'axios';

const API_URL = 'http://localhost:2025/admin';

class AdminService {
  async login(username, password) {
    const response = await axios.get(`${API_URL}/login`, { params: { username, password } });
    return response.data;
  }

  // Tutors
  async addTutor(tutor) {
    const response = await axios.post(`${API_URL}/tutors/add`, tutor);
    return response.data;
  }

  async getTutors() {
    const response = await axios.get(`${API_URL}/tutors/view`);
    return response.data;
  }

  async deleteTutor(tid) {
    const response = await axios.delete(`${API_URL}/tutors/delete/${tid}`);
    return response.data;
  }

  // Students
  async getStudents() {
    const response = await axios.get(`${API_URL}/students/view`);
    return response.data;
  }

  async deleteStudent(sid) {
    const response = await axios.delete(`${API_URL}/students/delete/${sid}`);
    return response.data;
  }

  // Bookings
  async getBookings() {
    const response = await axios.get(`${API_URL}/bookings/view`);
    return response.data;
  }

  async deleteBooking(bookingId) {
    const response = await axios.delete(`${API_URL}/bookings/delete/${bookingId}`);
    return response.data;
  }
}

export default new AdminService(); 