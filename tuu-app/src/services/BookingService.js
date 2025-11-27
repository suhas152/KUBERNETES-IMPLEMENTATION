import axios from 'axios';

// Base URLs per controllers provided
const STUDENT_API = 'http://localhost:30025/student';
const TUTOR_API = 'http://localhost:30025/tutor';
const ADMIN_API = 'http://localhost:30025/admin';

class BookingService {
  // Student: book a tutor
  async bookTutor(studentId, tutorId, bookingDateTime) {
    const response = await axios.post(
      `${STUDENT_API}/bookings/book`,
      bookingDateTime,
      { params: { studentId, tutorId }, headers: { 'Content-Type': 'text/plain' } }
    );
    return response.data;
  }

  // Student: get my bookings
  async getStudentBookings(studentId) {
    const response = await axios.get(`${STUDENT_API}/${studentId}/bookings`);
    return response.data;
  }

  // Tutor: get my bookings (alternative to TutorService)
  async getTutorBookings(tutorId) {
    const response = await axios.get(`${TUTOR_API}/${tutorId}/bookings`);
    return response.data;
  }

  // Tutor/Admin: update booking status
  // status should be one of: ACCEPTED, REJECTED, COMPLETED, PENDING (depends on your enum)
  async updateBookingStatus(bookingId, status) {
    const response = await axios.put(
      `${TUTOR_API}/bookings/${bookingId}/status`,
      null,
      { params: { status } }
    );
    return response.data;
  }

  // Admin: view all bookings
  async adminGetAllBookings() {
    const response = await axios.get(`${ADMIN_API}/bookings/view`);
    return response.data;
  }

  // Admin: delete booking
  async adminDeleteBooking(bookingId) {
    const response = await axios.delete(`${ADMIN_API}/bookings/delete/${bookingId}`);
    return response.data;
  }
}

export default new BookingService();