package com.lmsskillup.repository;
import com.lmsskillup.entity.LmsCourseModuleEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ModuleRepository
        extends JpaRepository<LmsCourseModuleEntity, Long> {

    // Get modules belonging to a particular course
    List<LmsCourseModuleEntity>
            findByCourseIdOrderBySequenceNoAsc(Long courseId);

    // Find module using business code
    Optional<LmsCourseModuleEntity> findByModuleCode(String moduleCode);

    // Check duplicate module code
    boolean existsByModuleCode(String moduleCode);
}
