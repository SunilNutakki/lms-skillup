
package com.lmsskillup.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "lms_technology")
@Data
public class TechnologyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "technology_id")
    private Long technologyId;

    @Column(name = "technology_code", nullable = false, unique = true, length = 50)
    private String technologyCode;

    @Column(name = "technology_name", nullable = false, unique = true, length = 150)
    private String technologyName;

    @Column(name = "description", length = 1000)
    private String description;

    @Column(name = "level", nullable = false, length = 30)
    private String level;

    @Column(name = "display_order", nullable = false)
    private Integer displayOrder = 0;

    @Column(name = "status", nullable = false, length = 20)
    private String status = "ACTIVE";

    @Column(name = "created_by", nullable = false, length = 15)
    private String createdBy;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_by", length = 15)
    private String updatedBy;

    @Column(name = "updated_at", insertable = false, updatable = false)
    private LocalDateTime updatedAt;

    @Column(name = "level_id")
    private Long levelId;

    @Column(name = "status_id")
    private Long statusId;
}
