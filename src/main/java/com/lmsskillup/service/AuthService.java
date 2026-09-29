package com.lmsskillup.service;

import com.lmsskillup.config.JwtService;
import com.lmsskillup.dto.LoginRequest;
import com.lmsskillup.dto.LoginResponse;
import com.lmsskillup.entity.OprauthRole;
import com.lmsskillup.entity.OprauthUser;
import com.lmsskillup.exception.InvalidCredentialsException;
import com.lmsskillup.repository.OprauthRoleRepository;
import com.lmsskillup.repository.OprauthUserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final OprauthUserRepository userRepository;
    private final JwtService jwtService;
    private final OprauthRoleRepository roleRepository;
    public AuthService(
    		OprauthUserRepository userRepository,
    		 OprauthRoleRepository roleRepository,
    	        JwtService jwtService) {

        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest request) {

    	OprauthUser user = userRepository
    	        .findByUsername(request.getUsername())
                .orElseThrow(() ->
                        new InvalidCredentialsException(
                                "Invalid user ID or password"));
    	
    	 OprauthRole role = roleRepository
    	            .findById(user.getRoleId())
    	            .orElseThrow(() ->
    	                    new InvalidCredentialsException(
    	                            "User role not found"));

        /*
         * Password verification will be added here
         * after confirming the existing password format.
         */

    	 String roleName = role.getRoleName();
    	 String token = jwtService.generateToken(
    	            user.getUserId(),
    	            roleName
    	    );

        return LoginResponse.builder()
        		  .success(true)
                  .message("Login successful")
                  .token(token)
                  .userId(user.getUserId())
                  .userFullName(user.getUserFullName())
                  .roleId(user.getRoleId())
                  .username(user.getUsername())
                  .build();
    }
}