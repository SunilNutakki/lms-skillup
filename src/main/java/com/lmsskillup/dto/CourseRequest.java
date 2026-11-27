package com.lmsskillup.dto;

import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Getter
@Setter
public class CourseRequest {

    private String courseCode;
    private String courseName;
    private String description;
    private Long technologyId;
    private Long levelId;
    private Long statusId;
    private BigDecimal durationHours;
}