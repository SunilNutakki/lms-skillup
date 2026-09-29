package com.lmsskillup.config;

import java.io.IOException;
import java.util.List;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    public JwtAuthenticationFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        // =====================================================
        // 1. Skip CORS preflight request
        // =====================================================

        if (HttpMethod.OPTIONS.matches(request.getMethod())) {

            filterChain.doFilter(request, response);

            return;
        }


        // =====================================================
        // 2. Get Authorization header
        // =====================================================

        String authHeader =
                request.getHeader("Authorization");


        // =====================================================
        // 3. No JWT -> Continue
        // =====================================================

        if (authHeader == null ||
                !authHeader.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);

            return;
        }


        // =====================================================
        // 4. Extract JWT
        // =====================================================

        String token =
                authHeader.substring(7);


        // =====================================================
        // 5. Validate / Extract JWT information
        // =====================================================

        try {

            String userId =
                    jwtService.extractUserId(token);

            String roleName =
                    jwtService.extractRoleName(token);


            // =================================================
            // 6. Create Authentication
            // =================================================

            if (userId != null &&
                    SecurityContextHolder
                        .getContext()
                        .getAuthentication() == null) {

                SimpleGrantedAuthority authority =
                        new SimpleGrantedAuthority(
                                "ROLE_" + roleName
                        );

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userId,
                                null,
                                List.of(authority)
                        );


                // =============================================
                // 7. Set Security Context
                // =============================================

                SecurityContextHolder
                        .getContext()
                        .setAuthentication(authentication);
            }

        } catch (Exception ex) {

            // Invalid JWT
            response.setStatus(
                    HttpServletResponse.SC_UNAUTHORIZED
            );

            return;
        }


        // =====================================================
        // 8. Continue request
        // =====================================================

        filterChain.doFilter(request, response);
    }
}