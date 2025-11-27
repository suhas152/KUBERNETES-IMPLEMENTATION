package com.klef.tuu.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.klef.tuu.model.Admin;

public interface AdminRepository extends JpaRepository<Admin,String> {
	 public Admin findByUsernameAndPassword(String username, String password);
	  
}
