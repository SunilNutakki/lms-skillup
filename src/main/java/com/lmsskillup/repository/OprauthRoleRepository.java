package com.lmsskillup.repository;

import com.lmsskillup.entity.OprauthRole;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OprauthRoleRepository
        extends JpaRepository<OprauthRole, String> {
    Optional<OprauthRole> findByRoleName(String roleName);

}