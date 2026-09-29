package com.lmsskillup.controller;

import com.lmsskillup.dto.LoginRequest;
import com.lmsskillup.dto.LoginResponse;
import com.lmsskillup.service.AuthService;
import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
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
}