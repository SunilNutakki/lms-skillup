package com.lmsskillup.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ModuleRequest {

    private Long courseId;

    private String moduleName;

    private String description;

    private Integer sequenceNo;

    private String status;
}
