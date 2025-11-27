package com.klef.tuu.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.klef.tuu.model.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {
	public Student findByUsernameAndPassword(String username, String password);

	  
}
	