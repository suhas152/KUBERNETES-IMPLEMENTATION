package com.klef.tuu.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.tuu.model.Student;
import com.klef.tuu.repository.StudentRepository;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public String studentregistration(Student student) {
        studentRepository.save(student);
        return "Student Registered successfully..";
    }

    @Override
    public Student checkstudentlogin(String username, String password) {
        return studentRepository.findByUsernameAndPassword(username, password);
    }

    @Override
    public String studentupdateprofile(Student student) {
        Optional<Student> object = studentRepository.findById(student.getS_id());

        String msg = null;

        if (object.isPresent()) {
            Student existingStudent = object.get();

            // 💡 This is the crucial fix: validate the gender before updating
            if (student.getGender() == null || student.getGender().isEmpty()) {
                return "Gender cannot be null or empty. Update failed.";
            }

            existingStudent.setName(student.getName());
            existingStudent.setAge(student.getAge());
            existingStudent.setAddress(student.getAddress());
            existingStudent.setEmail(student.getEmail());
            existingStudent.setPassword(student.getPassword());
            existingStudent.setGender(student.getGender());
            existingStudent.setUsername(student.getUsername());

            studentRepository.save(existingStudent);

            msg = "Student Profile Updated Successfully";
        } else {
            msg = "Student ID Not Found to Update";
        }

        return msg;
    }

    @Override
    public Student getStudentById(int sid) {
        return studentRepository.findById(sid).orElse(null);
    }
}
