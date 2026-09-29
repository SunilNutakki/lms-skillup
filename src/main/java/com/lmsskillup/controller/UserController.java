package com.lmsskillup.controller;

import com.lmsskillup.dto.UserProfileResponse;
import com.lmsskillup.entity.OprauthUser;
import com.lmsskillup.repository.OprauthUserRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final OprauthUserRepository userRepository;

    public UserController(OprauthUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> getMyProfile(
            Authentication authentication) {

        String userId = authentication.getName();

        OprauthUser user = userRepository.findById(userId)
                .orElseThrow();

        UserProfileResponse response = new UserProfileResponse();

        response.setUserId(user.getUserId());
        response.setUserFullName(user.getUserFullName());
        response.setEmail(user.getEmail());
        response.setPhone(user.getPhone());
        response.setCountryCodeId(user.getCountryCodeId());
        response.setStatusId(user.getStatusId());
        response.setProviderId(user.getProviderId());
        response.setRoleId(user.getRoleId());
        response.setCreatedAt(user.getCreatedAt());
        response.setUpdatedAt(user.getUpdatedAt());
        response.setUsername(user.getUsername());

        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/admin-test")
    public ResponseEntity<String> adminTest() {

        return ResponseEntity.ok(
                "ADMIN role authorization is working"
        );
    }
}