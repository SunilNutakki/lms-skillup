package com.lmsskillup.entity;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
@Entity
@Table(name = "lms_course_module")
@Data
public class LmsCourseModuleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "module_id")
    private Long moduleId;

    @Column(name = "course_id", nullable = false)
    private Long courseId;

    // Generated automatically by MySQL trigger
    @Column(name = "module_code", insertable = false, updatable = false)
    private String moduleCode;

    @Column(name = "module_name", nullable = false, length = 200)
    private String moduleName;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "sequence_no", nullable = false)
    private Integer sequenceNo;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "created_by", nullable = false)
    private String createdBy;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_at", insertable = false, updatable = false)
    private LocalDateTime updatedAt;
}
