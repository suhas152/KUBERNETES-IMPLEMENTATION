package com.klef.tuu.service;

import com.klef.tuu.model.Booking;
import com.klef.tuu.model.BookingStatus;
import com.klef.tuu.model.Student;
import com.klef.tuu.model.Tutor;
import com.klef.tuu.repository.BookingRepository;
import com.klef.tuu.repository.StudentRepository;
import com.klef.tuu.repository.TutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private StudentRepository studentRepository; 
    
    @Autowired
    private TutorRepository tutorRepository; 

    @Override
    public Booking bookTutor(int studentId, int tutorId, String bookingDateTime) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + studentId));
        Tutor tutor = tutorRepository.findById(tutorId)
                .orElseThrow(() -> new RuntimeException("Tutor not found with ID: " + tutorId));

        Booking newBooking = new Booking();
        newBooking.setStudent(student);
        newBooking.setTutor(tutor);
        newBooking.setBookingDateTime(LocalDateTime.parse(bookingDateTime));
        newBooking.setStatus(BookingStatus.PENDING);
        
        return bookingRepository.save(newBooking);
    }

    @Override
    public List<Booking> getStudentBookings(int studentId) {
        return bookingRepository.findByStudentId(studentId); // Corrected
    }

    @Override
    public List<Booking> getTutorBookings(int tutorId) {
        return bookingRepository.findByTutorId(tutorId); // Corrected
    }

    @Override
    public void updateBookingStatus(int bookingId, BookingStatus newStatus) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + bookingId));
        booking.setStatus(newStatus);
        bookingRepository.save(booking);
    }

    @Override
    public void deleteBooking(int bookingId) {
        bookingRepository.deleteById(bookingId);
    }

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}