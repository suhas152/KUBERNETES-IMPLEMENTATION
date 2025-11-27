package com.klef.tuu.service;

import java.util.List;

import com.klef.tuu.model.Tutor;

public interface TutorService {

    public String addTutor(Tutor tutor);

    public Tutor checkTutorLogin(String username, String password);
    public Tutor getTutorById(int tid);
    public List<Tutor> viewAllTutors();

    public String updateTutorProfile(Tutor tutor);

    public String deleteTutor(int tid);

}
