package com.klef.tuu.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.klef.tuu.model.Tutor;

public interface TutorRepository extends JpaRepository<Tutor, Integer> {
	public Tutor findByUsernameAndPassword(String username, String password);
}
