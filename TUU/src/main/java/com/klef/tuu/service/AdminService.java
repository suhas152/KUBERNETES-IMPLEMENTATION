package com.klef.tuu.service;

import java.util.List;

import com.klef.tuu.model.Admin;
import com.klef.tuu.model.Student;
import com.klef.tuu.model.Tutor;

public interface AdminService {
	 public Admin checkadminlogin(String username,String password);
	  
	  public String addtutors(Tutor tutor);
	  public List<Tutor> displaytutors();
	  public String deletetutors(int tid);
	  
	  public List<Student> displaystudents();
	  public String deletestudents(int sid);
}
