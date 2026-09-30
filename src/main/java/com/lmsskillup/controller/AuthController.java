package com.lmsskillup.controller;

import com.lmsskillup.dto.LoginRequest;
import com.lmsskillup.dto.LoginResponse;
import com.lmsskillup.entity.OprdashDashboardSetup;
import com.lmsskillup.service.AuthService;
import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/auth")

public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    
    @GetMapping("/test")
    public ResponseEntity<String> testJwt() {
        return ResponseEntity.ok("JWT authentication is working");
    }

    @PostMapping("/login")
    public LoginResponse login(
            @Valid @RequestBody LoginRequest request) {
       System.out.println("AuthController.login()");
        return authService.login(request);
    }
    
    @GetMapping("/my-dashboard")
    public ResponseEntity<OprdashDashboardSetup> getMyDashboard(
            Authentication authentication) {

        String roleName = authentication
                .getAuthorities()
                .stream()
                .findFirst()
                .map(authority ->
                        authority.getAuthority()
                                .replace("ROLE_", ""))
                .orElseThrow(() ->
                        new RuntimeException("User role not found"));

        OprdashDashboardSetup dashboard =
        		authService.getMyDashboard(roleName);

        return ResponseEntity.ok(dashboard);
    }
    
    @GetMapping("/admin-test")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> adminTest() {

        return ResponseEntity.ok("Admin API working");
    }
   
}