package com.lmsskillup.repository;

import com.lmsskillup.entity.LmsCourseEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository
        extends JpaRepository<LmsCourseEntity, Long> {

    boolean existsByCourseCode(String courseCode);
    
    boolean existsByCourseCodeAndCourseIdNot(
            String courseCode,
            Long courseId);
    

}