
package com.lmsskillup.repository;

import com.lmsskillup.entity.OprauthUser;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OprauthUserRepository
        extends JpaRepository<OprauthUser, String> {
	
	Optional<OprauthUser> findByUsername(String username);
}