package com.lmsskillup.repository;

import com.lmsskillup.entity.StatusMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StatusMasterRepository
        extends JpaRepository<StatusMaster, Long> {

    List<StatusMaster>
        findByIsActiveTrueOrderByDisplayOrderAsc();
}