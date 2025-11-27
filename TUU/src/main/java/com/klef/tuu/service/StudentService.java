package com.klef.tuu.service;

import com.klef.tuu.model.Student;

public interface StudentService {
	public String studentregistration(Student student);
	public Student checkstudentlogin(String username, String password);

	public String studentupdateprofile(Student student);

	

	public Student getStudentById(int sid);

}
