package com.lmsskillup.repository;

import com.lmsskillup.entity.OprdashContextSetup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OprdashContextSetupRepository
        extends JpaRepository<OprdashContextSetup, String> {

    Optional<OprdashContextSetup> findByRoleId(String roleId);
}