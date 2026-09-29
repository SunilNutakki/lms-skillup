package com.lmsskillup.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class LoginResponse {

    private boolean success;
    private String message;
    private String token;
    private String userId;
    private String username;
    private String userFullName;
    private String roleId;
}