package com.lmsskillup.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "oprauth_roles")
@Data
public class OprauthRole {

    @Id
    @Column(name = "role_id", length = 10)
    private String roleId;

    @Column(name = "role_name", nullable = false, unique = true, length = 50)
    private String roleName;

    @Column(name = "role_description", length = 255)
    private String roleDescription;

    @Column(name = "status", length = 1)
    private String status;

    @Column(name = "created_by", length = 50)
    private String createdBy;

    @Column(name = "created_date")
    private java.time.LocalDateTime createdDate;

    @Column(name = "updated_by", length = 50)
    private String updatedBy;

    @Column(name = "updated_date")
    private java.time.LocalDateTime updatedDate;
}