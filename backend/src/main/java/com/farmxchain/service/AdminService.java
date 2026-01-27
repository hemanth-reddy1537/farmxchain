package com.farmxchain.service;

import com.farmxchain.dto.AdminUserResponseDto;
import com.farmxchain.model.User;
import com.farmxchain.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminService {

    private final UserRepository userRepository;

    public AdminService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ================= ADMIN: ALL USERS =================
    public List<AdminUserResponseDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> new AdminUserResponseDto(
                        user.getUniqueId(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getRole()
                ))
                .collect(Collectors.toList());
    }
}
