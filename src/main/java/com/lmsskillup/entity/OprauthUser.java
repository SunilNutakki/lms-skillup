package com.lmsskillup.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "oprauth_users")
@Getter
@Setter
public class OprauthUser {

    @Id
    @Column(name = "user_id", length = 15, nullable = false)
    private String userId;
    
    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "user_full_name", length = 100, nullable = false)
    private String userFullName;

    @Column(name = "email", length = 150, unique = true)
    private String email;

    @Column(name = "phone", length = 15, unique = true)
    private String phone;

    @Column(name = "password", length = 255, nullable = false)
    private String password;

    @Column(name = "country_code_id", length = 15)
    private String countryCodeId;

    @Column(name = "status_id", length = 25)
    private String statusId;

    @Column(name = "provider_id", length = 25)
    private String providerId;

    @Column(name = "role_id", length = 10)
    private String roleId;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}