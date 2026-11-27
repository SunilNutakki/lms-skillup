package com.lmsskillup.repository;

import com.lmsskillup.entity.LevelMasterEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LevelMasterRepository
        extends JpaRepository<LevelMasterEntity, Long> {

    List<LevelMasterEntity>
        findByIsActiveTrueOrderByDisplayOrderAsc();
}