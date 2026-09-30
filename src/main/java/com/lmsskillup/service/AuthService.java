package com.lmsskillup.service;

import com.lmsskillup.config.JwtService;
import com.lmsskillup.dto.LoginRequest;
import com.lmsskillup.dto.LoginResponse;
import com.lmsskillup.entity.OprauthRole;
import com.lmsskillup.entity.OprauthUser;
import com.lmsskillup.entity.OprdashContextSetup;
import com.lmsskillup.entity.OprdashDashboardSetup;
import com.lmsskillup.exception.InvalidCredentialsException;
import com.lmsskillup.repository.OprauthRoleRepository;
import com.lmsskillup.repository.OprauthUserRepository;
import com.lmsskillup.repository.OprdashContextSetupRepository;
import com.lmsskillup.repository.OprdashDashboardSetupRepository;

import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final OprauthUserRepository userRepository;
    private final JwtService jwtService;
    private final OprauthRoleRepository roleRepository;
    private final OprdashContextSetupRepository contextRepository;
    private final OprdashDashboardSetupRepository dashboardRepository;
    public AuthService(
    		OprauthUserRepository userRepository,
    		 OprauthRoleRepository roleRepository,
    	        JwtService jwtService,OprdashContextSetupRepository contextRepository
    	        ,OprdashDashboardSetupRepository dashboardRepository) {

        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.jwtService = jwtService;
        this.contextRepository = contextRepository;
        this.dashboardRepository = dashboardRepository;
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
    
    
    public OprdashDashboardSetup getMyDashboard(String roleName) {

        // 1. Find role using role name
        OprauthRole role = roleRepository
                .findByRoleName(roleName)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Role not found: " + roleName));

        // 2. Get role ID
        String roleId = role.getRoleId();

        // 3. Find dashboard mapping using role ID
        OprdashContextSetup context = contextRepository
                .findByRoleId(roleId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Dashboard mapping not found for role: "
                                        + roleName));

        // 4. Get dashboard ID
        String dashboardId = context.getDashboardId();

        // 5. Find active dashboard
        return dashboardRepository
                .findByDashboardIdAndIsActive(
                        dashboardId,
                        "Y")
                .orElseThrow(() ->
                        new RuntimeException(
                                "Active dashboard not found: "
                                        + dashboardId));
    }
    
    
}