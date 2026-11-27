package com.lmsskillup.controller;

import com.lmsskillup.dto.CourseRequest;
import com.lmsskillup.dto.CourseResponse;
import com.lmsskillup.entity.LevelMasterEntity;
import com.lmsskillup.entity.StatusMaster;
import com.lmsskillup.entity.TechnologyEntity;
import com.lmsskillup.repository.LevelMasterRepository;
import com.lmsskillup.repository.StatusMasterRepository;
import com.lmsskillup.repository.TechnologyRepository;
import com.lmsskillup.service.CourseService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;
    private final TechnologyRepository technologyRepository;
    private final LevelMasterRepository levelMasterRepository;
    private final StatusMasterRepository statusMasterRepository;

    // Constructor injection
    public CourseController(CourseService courseService,TechnologyRepository technologyRepository,
    		LevelMasterRepository levelMasterRepository,StatusMasterRepository statusMasterRepository ) {
        this.courseService = courseService;
          this.technologyRepository=technologyRepository;
          this.levelMasterRepository=levelMasterRepository;
          this.statusMasterRepository=statusMasterRepository;
    }

    // 1. Create course
    // POST http://localhost:8081/api/courses
    @PostMapping
    public ResponseEntity<CourseResponse> createCourse(
            @Valid @RequestBody CourseRequest request) {

        CourseResponse response =
                courseService.createCourse(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // 2. Get all courses
    // GET http://localhost:8081/api/courses
    @GetMapping("getAllCourses")
    public ResponseEntity<List<CourseResponse>> getAllCourses() {

        List<CourseResponse> courses =
                courseService.getAllCourses();

        return ResponseEntity.ok(courses);
    }

    // 3. Get course by ID
    // GET http://localhost:8081/api/courses/1
    @GetMapping("getCourseById/{courseId}")
    public ResponseEntity<CourseResponse> getCourseById(
            @PathVariable Long courseId) {

        CourseResponse response =
                courseService.getCourseById(courseId);

        return ResponseEntity.ok(response);
    }

    // 4. Update course
    // PUT http://localhost:8081/api/courses/1
    @PutMapping("/{courseId}")
    public ResponseEntity<CourseResponse> updateCourse(
            @PathVariable Long courseId,
            @Valid @RequestBody CourseRequest request) {

        CourseResponse response =
                courseService.updateCourse(courseId, request);

        return ResponseEntity.ok(response);
    }
    
    
    
    @GetMapping("/technologies")
    public ResponseEntity<List<TechnologyEntity>> getTechnologies() {
        return ResponseEntity.ok(
        		  technologyRepository
                        .findByStatusIgnoreCaseOrderByDisplayOrderAsc("ACTIVE")
        );
    }
    
    @GetMapping("/levels")
    public ResponseEntity<List<LevelMasterEntity>> getLevels() {
        return ResponseEntity.ok(
                levelMasterRepository
                        .findByIsActiveTrueOrderByDisplayOrderAsc()
        );
    }
    
    @GetMapping("/statuses")
    public ResponseEntity<List<StatusMaster>> getStatuses() {
        return ResponseEntity.ok(
                statusMasterRepository
                        .findByIsActiveTrueOrderByDisplayOrderAsc()
        );
    }
    
}
