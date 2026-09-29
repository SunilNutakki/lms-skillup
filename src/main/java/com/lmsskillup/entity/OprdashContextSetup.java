package com.lmsskillup.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "oprdash_context_setup")
@Getter
@Setter
public class OprdashContextSetup {

    @Id
    @Column(name = "context_id", length = 9, nullable = false)
    private String contextId;

    @Column(name = "role_id", length = 10, nullable = false)
    private String roleId;

    @Column(name = "dashboard_id", length = 10, nullable = false)
    private String dashboardId;
}