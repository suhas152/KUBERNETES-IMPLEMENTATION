package com.klef.tuu.service;

import com.klef.tuu.model.Booking;
import com.klef.tuu.model.BookingStatus;
import java.util.List;

public interface BookingService {
    Booking bookTutor(int studentId, int tutorId, String bookingDateTime);
    List<Booking> getStudentBookings(int studentId);
    List<Booking> getTutorBookings(int tutorId);
    void updateBookingStatus(int bookingId, BookingStatus newStatus);
    void deleteBooking(int bookingId);
    List<Booking> getAllBookings(); 
}