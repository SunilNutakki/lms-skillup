package com.lmsskillup.service;

import com.lmsskillup.dto.ModuleRequest;
import com.lmsskillup.dto.ModuleResponse;

import com.lmsskillup.entity.LmsCourseEntity;
import com.lmsskillup.entity.LmsCourseModuleEntity;

import com.lmsskillup.exception.BadRequestException;

import com.lmsskillup.repository.CourseRepository;
import com.lmsskillup.repository.ModuleRepository;

import jakarta.persistence.EntityManager;

import java.util.List;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ModuleService {

    private final ModuleRepository moduleRepository;
    private final CourseRepository courseRepository;
    private final EntityManager entityManager;

    public ModuleService(
            ModuleRepository moduleRepository,
            CourseRepository courseRepository,
            EntityManager entityManager) {

        this.moduleRepository = moduleRepository;
        this.courseRepository = courseRepository;
        this.entityManager = entityManager;
    }

    // 1. Save module
    @Transactional
    public ModuleResponse createModule(ModuleRequest request) {

        // Validate request
        validateRequest(request);

        // Verify selected course
        LmsCourseEntity course = getCourse(request.getCourseId());

        // Create module entity
        LmsCourseModuleEntity module =
                new LmsCourseModuleEntity();

        module.setCourseId(course.getCourseId());
        module.setModuleName(request.getModuleName().trim());
        module.setDescription(request.getDescription());
        module.setSequenceNo(request.getSequenceNo());
        module.setStatus(request.getStatus().trim());

        // Get authenticated user
        module.setCreatedBy(getCurrentUserId());

        // Save module
        LmsCourseModuleEntity savedModule =
                moduleRepository.save(module);

        // Retrieve trigger-generated moduleCode and DB timestamps
        entityManager.refresh(savedModule);

        // Return response
        return toResponse(savedModule);
    }

    // 2. Validate request
    private void validateRequest(ModuleRequest request) {

        if (request == null) {
            throw new BadRequestException(
                    "Module request cannot be null");
        }

        if (request.getCourseId() == null
                || request.getCourseId() <= 0) {
            throw new BadRequestException(
                    "Valid course ID is required");
        }

        if (request.getModuleName() == null
                || request.getModuleName().isBlank()) {
            throw new BadRequestException(
                    "Module name is required");
        }

        if (request.getModuleName().trim().length() > 200) {
            throw new BadRequestException(
                    "Module name cannot exceed 200 characters");
        }

        if (request.getSequenceNo() == null
                || request.getSequenceNo() <= 0) {
            throw new BadRequestException(
                    "Valid display order is required");
        }

        if (request.getStatus() == null
                || request.getStatus().isBlank()) {
            throw new BadRequestException(
                    "Module status is required");
        }
    }

    // 3. Get course by ID
    private LmsCourseEntity getCourse(Long courseId) {

        return courseRepository.findById(courseId)
                .orElseThrow(() -> new BadRequestException(
                        "Course not found with ID: " + courseId));
    }

    // 4. Get authenticated user ID
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

    // 5. Map entity to response
    private ModuleResponse toResponse(
            LmsCourseModuleEntity module) {

        return new ModuleResponse(
                module.getModuleId(),
                module.getCourseId(),
                module.getModuleCode(),
                module.getModuleName(),
                module.getDescription(),
                module.getSequenceNo(),
                module.getStatus(),
                module.getCreatedBy(),
                module.getCreatedAt(),
                module.getUpdatedBy(),
                module.getUpdatedAt()
        );
    }
    
 // 2. Get all modules by course ID
    @Transactional(readOnly = true)
    public List<ModuleResponse> getModulesByCourseId(Long courseId) {

        if (courseId == null || courseId <= 0) {
            throw new BadRequestException(
                    "Valid course ID is required");
        }

        // Verify course exists
        getCourse(courseId);

        List<LmsCourseModuleEntity> modules =
                moduleRepository
                        .findByCourseIdOrderBySequenceNoAsc(courseId);

        return modules.stream()
                .map(this::toResponse)
                .toList();
    }
}
