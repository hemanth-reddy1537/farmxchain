package com.farmxchain.dto;

import com.farmxchain.model.Role;

public class AdminUserResponseDto {

    private String uniqueId;
    private String username;
    private String email;
    private Role role;

    public AdminUserResponseDto() {}

    // ✅ REQUIRED CONSTRUCTOR (FIXES YOUR ERROR)
    public AdminUserResponseDto(String uniqueId, String username, String email, Role role) {
        this.uniqueId = uniqueId;
        this.username = username;
        this.email = email;
        this.role = role;
    }

    // ===== GETTERS & SETTERS =====

    public String getUniqueId() {
        return uniqueId;
    }

    public void setUniqueId(String uniqueId) {
        this.uniqueId = uniqueId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
