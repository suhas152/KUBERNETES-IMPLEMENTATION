package com.klef.tuu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.klef.tuu.model.Tutor;
import com.klef.tuu.model.Booking;
import com.klef.tuu.model.BookingStatus;
import com.klef.tuu.service.TutorService;
import com.klef.tuu.service.BookingService;

@RestController
@RequestMapping("/tutor")
@CrossOrigin("*")
public class TutorController {

    @Autowired
    private TutorService tutorService;
    
    @Autowired
    private BookingService bookingService;

    @PostMapping("/add")
    public String addTutor(@RequestBody Tutor tutor) {
        return tutorService.addTutor(tutor);
    }

    @GetMapping("/login")
    public Tutor checkTutorLogin(@RequestParam String username, @RequestParam String password) {
        return tutorService.checkTutorLogin(username, password);
    }

    @GetMapping("/view/{tid}")
    public Tutor getTutorById(@PathVariable int tid) {
        return tutorService.getTutorById(tid);
    }

    @GetMapping("/viewall")
    public List<Tutor> viewAllTutors() {
        return tutorService.viewAllTutors();
    }

    @PutMapping("/update")
    public String updateTutorProfile(@RequestBody Tutor tutor) {
        return tutorService.updateTutorProfile(tutor);
    }

    @DeleteMapping("/delete/{tid}")
    public String deleteTutor(@PathVariable int tid) {
        return tutorService.deleteTutor(tid);
    }
    
    // New endpoint to get a tutor's bookings
    @GetMapping("/{tutorId}/bookings")
    public List<Booking> getMyBookings(@PathVariable int tutorId) {
        return bookingService.getTutorBookings(tutorId);
    }

    // New endpoint to update the status of a booking
    @PutMapping("/bookings/{bookingId}/status")
    public void updateBookingStatus(@PathVariable int bookingId, @RequestParam BookingStatus status) {
        bookingService.updateBookingStatus(bookingId, status);
    }
}