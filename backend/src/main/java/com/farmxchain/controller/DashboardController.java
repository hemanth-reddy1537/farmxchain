package com.farmxchain.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.farmxchain.dto.AdminDashboardResponseDto;
import com.farmxchain.service.DashboardService;

@RestController
@RequestMapping("/api/admin/dashboard")
@CrossOrigin
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/overview")
//    @PreAuthorize("hasRole('ADMIN')")
    public AdminDashboardResponseDto getDashboardOverview() {
        return dashboardService.getAdminDashboardStats();
    }
}
