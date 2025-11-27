package com.klef.tuu.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.tuu.model.Tutor;
import com.klef.tuu.repository.TutorRepository;

@Service
public class TutorServiceImpl implements TutorService {

    @Autowired
    private TutorRepository tutorRepository;

    @Override
    public String addTutor(Tutor tutor) {
        tutorRepository.save(tutor);
        return "Tutor added successfully.";
    }

    @Override
    public Tutor checkTutorLogin(String username, String password) {
        return tutorRepository.findByUsernameAndPassword(username, password);
    }

    @Override
    public Tutor getTutorById(int tid) {
        return tutorRepository.findById(tid).orElse(null);
    }

    @Override
    public List<Tutor> viewAllTutors() {
        return tutorRepository.findAll();
    }

    @Override
    public String updateTutorProfile(Tutor tutor) {
        Optional<Tutor> optional = tutorRepository.findById(tutor.getId());

        if (optional.isPresent()) {
            Tutor t = optional.get();
            t.setTutor_name(tutor.getTutor_name());
            t.setEmail(tutor.getEmail());
            t.setUsername(tutor.getUsername());
            t.setPassword(tutor.getPassword());
            t.setGender(tutor.getGender());
            t.setTutor_location(tutor.getTutor_location());
            t.setMobileno(tutor.getMobileno());

            tutorRepository.save(t);
            return "Tutor profile updated successfully.";
        } else {
            return "Tutor ID not found.";
        }
    }

    @Override
    public String deleteTutor(int tid) {
        Optional<Tutor> optional = tutorRepository.findById(tid);

        if (optional.isPresent()) {
            tutorRepository.deleteById(tid);
            return "Tutor deleted successfully.";
        } else {
            return "Tutor ID not found.";
        }
    }
}
