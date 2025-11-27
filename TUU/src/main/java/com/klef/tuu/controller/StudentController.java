package com.klef.tuu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.klef.tuu.model.Student;
import com.klef.tuu.model.Booking;
import com.klef.tuu.service.StudentService;
import com.klef.tuu.service.BookingService;

@RestController
@RequestMapping("/student")
@CrossOrigin("*")
public class StudentController {

    @Autowired
    private StudentService studentService;
    
    @Autowired
    private BookingService bookingService;

    @PostMapping("/register")
    public String studentRegistration(@RequestBody Student student) {
        return studentService.studentregistration(student);
    }

    @GetMapping("/login")
    public Student checkStudentLogin(@RequestParam String username, @RequestParam String password) {
        return studentService.checkstudentlogin(username, password);
    }

    @PutMapping("/update")
    public String studentUpdateProfile(@RequestBody Student student) {
        return studentService.studentupdateprofile(student);
    }

    @GetMapping("/view/{sid}")
    public Student getStudentById(@PathVariable int sid) {
        return studentService.getStudentById(sid);
    }
    
    // New endpoint to book a tutor
    @PostMapping("/bookings/book")
    public Booking bookTutor(@RequestParam int studentId, @RequestParam int tutorId, @RequestBody String bookingDateTime) {
        return bookingService.bookTutor(studentId, tutorId, bookingDateTime);
    }
    
    // New endpoint to get a student's bookings
    @GetMapping("/{studentId}/bookings")
    public List<Booking> getMyBookings(@PathVariable int studentId) {
        return bookingService.getStudentBookings(studentId);
    }
}