package com.farmxchain.model;

import jakarta.persistence.*;

@Entity
@Table(
    name = "users",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = "uniqueId"),
        @UniqueConstraint(columnNames = "email")
    }
)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🔑 CORE IDENTIFIER (FARMER-UUID etc)
    @Column(nullable = false, updatable = false)
    private String uniqueId;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    // ✅ ENUM, not String
    @Enumerated(EnumType.STRING)

    private Role role;

    private String name;
    private String phoneNumber;
    private String address;
    private String profileImage;

    // ✅ Constructors
    public User() {}

    public User(String username, String email, String password, Role role, String name) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.name = name;
    }

    // ✅ Getters only for uniqueId (NO setter)
    public String getUniqueId() {
        return uniqueId;
    }

    // 🔐 Internal setter (used only during registration)
    public void setUniqueId(String uniqueId) {
        this.uniqueId = uniqueId;
    }

    // -------- OTHER GETTERS / SETTERS --------

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }
    
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }
    
    public void setAddress(String address) {
        this.address = address;
    }

    public String getProfileImage() {
        return profileImage;
    }
    
    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }
}
