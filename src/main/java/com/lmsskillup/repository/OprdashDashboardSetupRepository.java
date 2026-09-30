package com.lmsskillup.repository;

import com.lmsskillup.entity.OprdashDashboardSetup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OprdashDashboardSetupRepository
        extends JpaRepository<OprdashDashboardSetup, String> {

    Optional<OprdashDashboardSetup>
        findByDashboardIdAndIsActive(
            String dashboardId,
            String isActive
        );
}