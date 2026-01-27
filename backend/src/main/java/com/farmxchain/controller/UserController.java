package com.farmxchain.controller;

import com.farmxchain.model.User;
import com.farmxchain.model.Role;
import com.farmxchain.repository.UserRepository;
import com.farmxchain.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ===================== TEST =====================
    @GetMapping("/test")
    public String testApi() {
        return "FarmXChain User API is running";
    }

    // ===================== REGISTER =====================
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email already exists"));
        }

        // Default username
        if (user.getUsername() == null || user.getUsername().isBlank()) {
            user.setUsername(
                    user.getName().toLowerCase().replaceAll("\\s+", "")
                            + System.currentTimeMillis()
            );
        }

        // Prevent admin registration
        if (user.getRole() == null || user.getRole() == Role.ADMIN) {
            user.setRole(Role.CUSTOMER);
        }

        // 🔑 Generate UNIQUE USER ID
        String uniqueId = user.getRole().name() + "-" + UUID.randomUUID();
        user.setUniqueId(uniqueId);

        // 🔐 Hash password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);

        return ResponseEntity.ok(
                Map.of(
                        "message", "User registered successfully",
                        "uniqueId", user.getUniqueId(),
                        "role", user.getRole()
                )
        );
    }

    // ===================== LOGIN =====================
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginData) {

        String email = loginData.get("email");
        String password = loginData.get("password");

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid credentials"));
        }

        User user = userOpt.get();

        if (!passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid credentials"));
        }

        String token = jwtUtil.generateToken(
                user.getUniqueId(),
                user.getRole().name()
        );

        return ResponseEntity.ok(
                Map.of(
                        "token", token,
                        "uniqueId", user.getUniqueId(),
                        "role", user.getRole(),
                        "username", user.getUsername()
                )
        );
    }

    // ===================== PROFILE (ME) =====================
    @GetMapping("/me")
    public ResponseEntity<?> getMyProfile(
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.replace("Bearer ", "");
        String uniqueId = jwtUtil.extractUniqueId(token);

        User user = userRepository.findByUniqueId(uniqueId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(user);
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateMyProfile(
            @RequestBody Map<String, String> body,
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.replace("Bearer ", "");
        String uniqueId = jwtUtil.extractUniqueId(token);

        User user = userRepository.findByUniqueId(uniqueId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPhoneNumber(body.get("phoneNumber"));
        user.setAddress(body.get("address"));
        user.setProfileImage(body.get("profileImage"));

        userRepository.save(user);
        return ResponseEntity.ok(user);
    }

    // ===================== ADMIN =====================
    @GetMapping("/admin/all")
    public ResponseEntity<?> getAllUsers(
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.replace("Bearer ", "");
        String role = jwtUtil.extractRole(token);

        if (!Role.ADMIN.name().equals(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "Admins only"));
        }

        return ResponseEntity.ok(userRepository.findAll());
    }

    @PutMapping("/admin/{uniqueId}/role")
    public ResponseEntity<?> updateUserRole(
            @PathVariable String uniqueId,
            @RequestBody Map<String, String> body,
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.replace("Bearer ", "");
        String requesterRole = jwtUtil.extractRole(token);

        if (!Role.ADMIN.name().equals(requesterRole)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "Admins only"));
        }

        User user = userRepository.findByUniqueId(uniqueId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Role newRole = Role.valueOf(body.get("role"));
        if (newRole == Role.ADMIN) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Cannot assign ADMIN role"));
        }

        user.setRole(newRole);
        userRepository.save(user);

        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/admin/{uniqueId}")
    public ResponseEntity<?> deleteUser(
            @PathVariable String uniqueId,
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.replace("Bearer ", "");
        String requesterRole = jwtUtil.extractRole(token);

        if (!Role.ADMIN.name().equals(requesterRole)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "Admins only"));
        }

        User user = userRepository.findByUniqueId(uniqueId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() == Role.ADMIN) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Admin cannot be deleted"));
        }

        userRepository.delete(user);
        return ResponseEntity.ok(Map.of("message", "User deleted"));
    }
}
