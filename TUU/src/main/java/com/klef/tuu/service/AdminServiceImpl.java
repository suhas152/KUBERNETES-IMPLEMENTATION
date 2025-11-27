package com.klef.tuu.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.tuu.model.Admin;
import com.klef.tuu.model.Student;
import com.klef.tuu.model.Tutor;
import com.klef.tuu.repository.AdminRepository;
import com.klef.tuu.repository.StudentRepository;
import com.klef.tuu.repository.TutorRepository;

@Service
public class AdminServiceImpl implements AdminService{

	@Autowired
    private AdminRepository adminRepository;
	
	@Autowired
    private TutorRepository tutorRepository;
	
	@Autowired
	private StudentRepository studentRepository;
	
	
	
	
	@Override
	public Admin checkadminlogin(String username, String password) {
		return adminRepository.findByUsernameAndPassword(username, password);
	}

	@Override
	public String addtutors(Tutor tutor) {
		tutorRepository.save(tutor);
		return "Tutor Added Successfully";
	}

	@Override
	public List<Tutor> displaytutors() {
		
		return tutorRepository.findAll();
	}

	@Override
	public String deletetutors(int tid) {
		Optional<Tutor> tutor=tutorRepository.findById(tid);
		if(tutor.isPresent()) {
			tutorRepository.deleteById(tid);
			return "Tutor deleted successfully";
		}else {
			return "Tutor ID not found";
		}
	}

	@Override
	public List<Student> displaystudents() {
 return studentRepository.findAll();
	}

	@Override
	public String deletestudents(int sid) {
Optional<Student> student = studentRepository.findById(sid);
	    
	    if (student.isPresent()) 
	    {	
	        studentRepository.deleteById(sid);
	        return "Student Deleted Successfully";
	    } 
	    else 
	    {
	        return "Student ID Not Found";
	    }
	}

}
