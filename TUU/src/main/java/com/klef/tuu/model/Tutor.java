package com.klef.tuu.model;import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="tutor_table")
public class Tutor {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="tutor_id")
    private int id;
    public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getMobileno() {
		return mobileno;
	}
	public void setMobileno(String mobileno) {
		this.mobileno = mobileno;
	}
	public String getTutor_name() {
		return tutor_name;
	}
	public void setTutor_name(String tutor_name) {
		this.tutor_name = tutor_name;
	}
	public String getTutor_location() {
		return tutor_location;
	}
	public void setTutor_location(String tutor_location) {
		this.tutor_location = tutor_location;
	}
	
    @Column(length = 10,nullable = false)
    private String gender;

    @Column(length = 50,nullable = false,unique=true)
    private String email;
    @Column(length = 50,nullable = false,unique=true)
    private String username;
    @Column(length = 50,nullable = false)
    private String password;
    @Column(length = 20,nullable = false,unique=true)
    private String mobileno;
    @Column(length = 50,nullable = false)
    private String tutor_name;
    @Column(length = 50,nullable = false)
    private String tutor_location;
	
}
