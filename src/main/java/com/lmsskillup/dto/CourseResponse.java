package com.lmsskillup.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class CourseResponse {

    private Long courseId;
    private String courseCode;
    private String courseName;
    private String description;
    private Long technologyId;
    private Long levelId;
    private Long statusId;
    private String level;
    private String status;
    private BigDecimal durationHours;
    private LocalDateTime createdAt;
}