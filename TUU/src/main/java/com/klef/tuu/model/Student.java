package com.klef.tuu.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="student_table")
public class Student {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(length=10)
	private int s_id;
	  public int getS_id() {
		return s_id;
	}
	public void setS_id(int s_id) {
		this.s_id = s_id;
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
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPh_no() {
		return ph_no;
	}
	public void setPh_no(String ph_no) {
		this.ph_no = ph_no;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getGender() {
		return Gender;
	}
	public void setGender(String gender) {
		Gender = gender;
	}
	@Column(name="student_name",length = 50,nullable = false,unique=true)
	private String username;
	  @Column(name="student_passwd",length = 50,nullable = false)
	private String password;
	  @Column(name="student_email",length = 50,nullable = false,unique=true)
	private String email;
	  @Column(name="student_phone",length = 50,nullable = false,unique=true)
	private String ph_no;
	  @Column(name="student_age",length = 50,nullable = false)
	private int age;
	  @Column(name="s_name",length = 50,nullable = false)
	private String name;
	  @Column(name="student_adress",length = 50,nullable = false)
	private String address;
	  @Column(name="student_gender",length = 50,nullable = false)
	private String Gender;
	
	
	
	

}
