package com.lmsskillup.repository;

import com.lmsskillup.entity.TechnologyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TechnologyRepository
        extends JpaRepository<TechnologyEntity, Long> {

    List<TechnologyEntity> findByStatusIgnoreCaseOrderByDisplayOrderAsc(String status);
}