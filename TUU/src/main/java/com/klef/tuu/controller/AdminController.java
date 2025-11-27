package com.klef.tuu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.klef.tuu.model.Admin;
import com.klef.tuu.model.Student;
import com.klef.tuu.model.Tutor;
import com.klef.tuu.model.Booking;
import com.klef.tuu.service.AdminService;
import com.klef.tuu.service.BookingService;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private AdminService adminService;
    
    @Autowired
    private BookingService bookingService;

    @GetMapping("/login")
    public Admin checkAdminLogin(@RequestParam String username, @RequestParam String password) {
        return adminService.checkadminlogin(username, password);
    }

    @PostMapping("/tutors/add")
    public String addTutors(@RequestBody Tutor tutor) {
        return adminService.addtutors(tutor);
    }

    @GetMapping("/tutors/view")
    public List<Tutor> displayTutors() {
        return adminService.displaytutors();
    }

    @DeleteMapping("/tutors/delete/{tid}")
    public String deleteTutors(@PathVariable int tid) {
        return adminService.deletetutors(tid);
    }

    @GetMapping("/students/view")
    public List<Student> displayStudents() {
        return adminService.displaystudents();
    }

    @DeleteMapping("/students/delete/{sid}")
    public String deleteStudents(@PathVariable int sid) {
        return adminService.deletestudents(sid);
    }
    
    // New endpoint to get all bookings
    @GetMapping("/bookings/view")
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }
    
    // New endpoint to delete a booking
    @DeleteMapping("/bookings/delete/{bookingId}")
    public void deleteBooking(@PathVariable int bookingId) {
        bookingService.deleteBooking(bookingId);
    }
}