package com.lmsskillup.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserProfileResponse {

    private String userId;
    private String userFullName;
    private String username;
    private String email;
    private String phone;
    private String countryCodeId;
    private String statusId;
    private String providerId;
    private String roleId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}