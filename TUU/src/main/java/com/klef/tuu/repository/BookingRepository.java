package com.klef.tuu.repository;

import com.klef.tuu.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {

    @Query("SELECT b FROM Booking b WHERE b.student.s_id = :studentId")
    List<Booking> findByStudentId(@Param("studentId") int studentId);
    
    // Assuming your Tutor model's ID field is named `id`
    @Query("SELECT b FROM Booking b WHERE b.tutor.id = :tutorId")
    List<Booking> findByTutorId(@Param("tutorId") int tutorId);
}