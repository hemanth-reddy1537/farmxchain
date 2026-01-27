package com.farmxchain.dto;

public class AdminUserHistoryResponseDto {

    private Object user;
    private String role;
    private Object data;

    public AdminUserHistoryResponseDto(Object user, String role, Object data) {
        this.user = user;
        this.role = role;
        this.data = data;
    }

    public Object getUser() {
        return user;
    }

    public String getRole() {
        return role;
    }

    public Object getData() {
        return data;
    }
}
