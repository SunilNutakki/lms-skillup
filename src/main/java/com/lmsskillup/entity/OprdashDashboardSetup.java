package com.lmsskillup.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "oprdash_dashboard_setup")
@Getter
@Setter
public class OprdashDashboardSetup {

    @Id
    @Column(name = "dashboard_id", length = 10, nullable = false)
    private String dashboardId;

    @Column(name = "dashboard_name", length = 100, nullable = false)
    private String dashboardName;

    @Column(name = "description", length = 255)
    private String description;

    @Column(name = "is_active", length = 1)
    private String isActive;

    @Column(name = "url_path", length = 150, nullable = false)
    private String urlPath;
}