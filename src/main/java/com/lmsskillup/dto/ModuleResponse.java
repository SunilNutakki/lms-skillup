package com.lmsskillup.dto;
import lombok.Getter;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ModuleResponse {

    private Long moduleId;

    private Long courseId;

    private String moduleCode;

    private String moduleName;

    private String description;

    private Integer sequenceNo;

    private String status;

    private String createdBy;

    private LocalDateTime createdAt;

    private String updatedBy;

    private LocalDateTime updatedAt;
}
