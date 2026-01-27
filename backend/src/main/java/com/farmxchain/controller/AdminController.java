package com.farmxchain.controller;

import com.farmxchain.dto.AdminUserResponseDto;
import com.farmxchain.model.User;
import com.farmxchain.security.JwtUtil;
import com.farmxchain.security.RoleValidator;
import com.farmxchain.service.AdminService;
import com.farmxchain.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.farmxchain.service.AdminHistoryService;


import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final AdminHistoryService adminHistoryService;


    public AdminController(
            AdminService adminService,
            AdminHistoryService adminHistoryService,
            JwtUtil jwtUtil,
            UserRepository userRepository
    ) {
        this.adminService = adminService;
        this.adminHistoryService = adminHistoryService;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }
    @GetMapping("/users")
    public ResponseEntity<List<AdminUserResponseDto>> getAllUsers(
            @RequestHeader("Authorization") String token
    ) {
        String jwt = token.replace("Bearer ", "");
        String uniqueId = jwtUtil.extractUniqueId(jwt);

        User adminUser = userRepository.findByUniqueId(uniqueId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // ✅ STATIC ROLE CHECK (matches your design)
        RoleValidator.requireAdmin(adminUser);

        return ResponseEntity.ok(adminService.getAllUsers());
    }
    @GetMapping("/users/{id}/history")
    public ResponseEntity<?> getUserHistory(
            @PathVariable Long id,
            @RequestHeader("Authorization") String token
    ) {
        String jwt = token.replace("Bearer ", "");
        String uniqueId = jwtUtil.extractUniqueId(jwt);
        User adminUser = userRepository.findByUniqueId(uniqueId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        RoleValidator.requireAdmin(adminUser);

        return ResponseEntity.ok(adminHistoryService.getUserHistory(id));
    }

}
