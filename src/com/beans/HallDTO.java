package com.beans;

public class HallDTO {
	private int h_uid;
	private String hallType;
	private String hallLocation;
	private String hallSize;
	private String theaterCode;
	private String h_movie;
	private String h_grade;
	
	public HallDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public HallDTO(int h_uid, String hallType, String hallLocation, String hallSize, String theaterCode, String h_movie,
			String h_grade) {
		super();
		this.h_uid = h_uid;
		this.hallType = hallType;
		this.hallLocation = hallLocation;
		this.hallSize = hallSize;
		this.theaterCode = theaterCode;
		this.h_movie = h_movie;
		this.h_grade = h_grade;
	}

	public int getH_uid() {
		return h_uid;
	}

	public void setH_uid(int h_uid) {
		this.h_uid = h_uid;
	}

	public String getHallType() {
		return hallType;
	}

	public void setHallType(String hallType) {
		this.hallType = hallType;
	}

	public String getHallLocation() {
		return hallLocation;
	}

	public void setHallLocation(String hallLocation) {
		this.hallLocation = hallLocation;
	}

	public String getHallSize() {
		return hallSize;
	}

	public void setHallSize(String hallSize) {
		this.hallSize = hallSize;
	}

	public String getTheaterCode() {
		return theaterCode;
	}

	public void setTheaterCode(String theaterCode) {
		this.theaterCode = theaterCode;
	}

	public String getH_movie() {
		return h_movie;
	}

	public void setH_movie(String h_movie) {
		this.h_movie = h_movie;
	}

	public String getH_grade() {
		return h_grade;
	}

	public void setH_grade(String h_grade) {
		this.h_grade = h_grade;
	}
	
	
}
