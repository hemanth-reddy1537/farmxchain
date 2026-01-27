package com.farmxchain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.farmxchain.model.User;
import com.farmxchain.model.Role;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // 🔑 CORE LOOKUP
    Optional<User> findByUniqueId(String uniqueId);

    // 🔐 Login only
    Optional<User> findByEmail(String email);

    // 📊 Admin dashboard
    long countByRole(Role role);
}
