
package com.lmsskillup.service;

import com.lmsskillup.dto.CourseRequest;
import com.lmsskillup.dto.CourseResponse;
import com.lmsskillup.entity.LmsCourseEntity;
import com.lmsskillup.entity.TechnologyEntity;
import com.lmsskillup.entity.LevelMasterEntity;
import com.lmsskillup.entity.StatusMaster;
import com.lmsskillup.exception.BadRequestException;
import com.lmsskillup.repository.CourseRepository;
import com.lmsskillup.repository.TechnologyRepository;
import com.lmsskillup.repository.LevelMasterRepository;
import com.lmsskillup.repository.StatusMasterRepository;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final TechnologyRepository technologyRepository;
    private final LevelMasterRepository levelRepository;
    private final StatusMasterRepository statusRepository;

    public CourseService(
            CourseRepository courseRepository,
            TechnologyRepository technologyRepository,
            LevelMasterRepository levelRepository,
            StatusMasterRepository statusRepository) {

        this.courseRepository = courseRepository;
        this.technologyRepository = technologyRepository;
        this.levelRepository = levelRepository;
        this.statusRepository = statusRepository;
    }

    // 1. Create course
    @Transactional
    public CourseResponse createCourse(CourseRequest request) {

        validateRequest(request);

        String courseCode = request.getCourseCode().trim();

        if (courseRepository.existsByCourseCode(courseCode)) {
            throw new BadRequestException(
                    "Course code already exists: " + courseCode);
        }

        TechnologyEntity technology =
                getTechnology(request.getTechnologyId());

        LevelMasterEntity level =
                getLevel(request.getLevelId());

        StatusMaster status =
                getStatus(request.getStatusId());

        LmsCourseEntity course = new LmsCourseEntity();

        mapRequestToEntity(
                course, request, technology, level, status);

        course.setCreatedBy(getCurrentUserId());

        LmsCourseEntity savedCourse =
                courseRepository.save(course);

        return toResponse(savedCourse);
    }

    // 2. Get all courses
    @Transactional(readOnly = true)
    public List<CourseResponse> getAllCourses() {

        return courseRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // 3. Get course by ID
    @Transactional(readOnly = true)
    public CourseResponse getCourseById(Long courseId) {

        if (courseId == null || courseId <= 0) {
            throw new BadRequestException(
                    "Valid course ID is required");
        }

        LmsCourseEntity course = courseRepository
                .findById(courseId)
                .orElseThrow(() -> new BadRequestException(
                        "Course not found with ID: " + courseId));

        return toResponse(course);
    }

    // 4. Update course
    @Transactional
    public CourseResponse updateCourse(
            Long courseId,
            CourseRequest request) {

        if (courseId == null || courseId <= 0) {
            throw new BadRequestException(
                    "Valid course ID is required");
        }

        validateRequest(request);

        LmsCourseEntity course = courseRepository
                .findById(courseId)
                .orElseThrow(() -> new BadRequestException(
                        "Course not found with ID: " + courseId));

        String courseCode = request.getCourseCode().trim();

        if (courseRepository.existsByCourseCodeAndCourseIdNot(
                courseCode, courseId)) {

            throw new BadRequestException(
                    "Course code already exists: " + courseCode);
        }

        TechnologyEntity technology =
                getTechnology(request.getTechnologyId());

        LevelMasterEntity level =
                getLevel(request.getLevelId());

        StatusMaster status =
                getStatus(request.getStatusId());

        mapRequestToEntity(
                course, request, technology, level, status);

        course.setUpdatedBy(getCurrentUserId());

        LmsCourseEntity updatedCourse =
                courseRepository.save(course);

        return toResponse(updatedCourse);
    }

    // 5. Validate request
    private void validateRequest(CourseRequest request) {

        if (request == null) {
            throw new BadRequestException(
                    "Course request cannot be null");
        }

//        if (request.getCourseCode() == null
//                || request.getCourseCode().isBlank()) {
//            throw new BadRequestException(
//                    "Course code is required");
//        }

        if (request.getCourseName() == null
                || request.getCourseName().isBlank()) {
            throw new BadRequestException(
                    "Course name is required");
        }

        if (request.getTechnologyId() == null) {
            throw new BadRequestException(
                    "Technology is required");
        }

        if (request.getLevelId() == null) {
            throw new BadRequestException(
                    "Level is required");
        }

        if (request.getStatusId() == null) {
            throw new BadRequestException(
                    "Status is required");
        }

        if (request.getCourseCode().trim().length() > 50) {
            throw new BadRequestException(
                    "Course code cannot exceed 50 characters");
        }

        if (request.getCourseName().trim().length() > 200) {
            throw new BadRequestException(
                    "Course name cannot exceed 200 characters");
        }

        if (request.getDescription() != null
                && request.getDescription().length() > 65535) {
            throw new BadRequestException(
                    "Course description is too long");
        }

        BigDecimal duration = request.getDurationHours();

        if (duration != null) {

            if (duration.signum() < 0) {
                throw new BadRequestException(
                        "Duration hours cannot be negative");
            }

            // lms_course.duration_hours is DECIMAL(6,2)
            if (duration.compareTo(
                    new BigDecimal("9999.99")) > 0) {
                throw new BadRequestException(
                        "Duration hours cannot exceed 9999.99");
            }

            if (duration.stripTrailingZeros().scale() > 2) {
                throw new BadRequestException(
                        "Duration hours can have at most 2 decimal places");
            }
        }
    }

    // 6. Get technology by ID
    private TechnologyEntity getTechnology(Long technologyId) {

        if (technologyId == null || technologyId <= 0) {
            throw new BadRequestException(
                    "Valid technology ID is required");
        }

        TechnologyEntity technology = technologyRepository
                .findById(technologyId)
                .orElseThrow(() -> new BadRequestException(
                        "Technology not found with ID: "
                                + technologyId));

        if (!"ACTIVE".equalsIgnoreCase(
                technology.getStatus())) {
            throw new BadRequestException(
                    "Selected technology is inactive");
        }

        return technology;
    }

    // 7. Get level by ID
    private LevelMasterEntity getLevel(Long levelId) {

        if (levelId == null || levelId <= 0) {
            throw new BadRequestException(
                    "Valid level ID is required");
        }

        LevelMasterEntity level = levelRepository
                .findById(levelId)
                .orElseThrow(() -> new BadRequestException(
                        "Level not found with ID: " + levelId));

        if (!Boolean.TRUE.equals(level.getIsActive())) {
            throw new BadRequestException(
                    "Selected level is inactive");
        }

        return level;
    }

    // 8. Get status by ID
    private StatusMaster getStatus(Long statusId) {

        if (statusId == null || statusId <= 0) {
            throw new BadRequestException(
                    "Valid status ID is required");
        }

        StatusMaster status = statusRepository
                .findById(statusId)
                .orElseThrow(() -> new BadRequestException(
                        "Status not found with ID: " + statusId));

        if (!Boolean.TRUE.equals(status.getIsActive())) {
            throw new BadRequestException(
                    "Selected status is inactive");
        }

        return status;
    }

    // 9. Map request to entity
    private void mapRequestToEntity(
            LmsCourseEntity course,
            CourseRequest request,
            TechnologyEntity technology,
            LevelMasterEntity level,
            StatusMaster status) {

        course.setCourseCode(request.getCourseCode().trim());
        course.setCourseName(request.getCourseName().trim());
        course.setDescription(request.getDescription());
        course.setTechnologyId(technology.getTechnologyId());
        course.setLevelId(level.getLevelId());
        course.setStatusId(status.getStatusId());

        // Store the master codes in the existing course columns.
        course.setLevel(level.getLevelCode());
        course.setStatus(status.getStatusCode());

        course.setDurationHours(request.getDurationHours());
    }

    // 10. Map entity to response
    private CourseResponse toResponse(LmsCourseEntity course) {

        return new CourseResponse(
                course.getCourseId(),
                course.getCourseCode(),
                course.getCourseName(),
                course.getDescription(),
                course.getTechnologyId(),
                course.getLevelId(),
                course.getStatusId(),
                course.getLevel(),
                course.getStatus(),
                course.getDurationHours(),
                course.getCreatedAt()
        );
    }

    // 11. Get authenticated user's ID
    private String getCurrentUserId() {

        Authentication authentication =
                SecurityContextHolder.getContext()
                        .getAuthentication();

        if (authentication == null
                || !authentication.isAuthenticated()
                || authentication instanceof AnonymousAuthenticationToken) {

            throw new BadRequestException(
                    "Authenticated user is required");
        }

        String userId = authentication.getName();

        if (userId == null || userId.isBlank()) {
            throw new BadRequestException(
                    "Authenticated user ID is unavailable");
        }

        return userId;
    }
}
