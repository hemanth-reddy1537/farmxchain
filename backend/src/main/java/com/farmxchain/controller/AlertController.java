package com.farmxchain.controller;

import com.farmxchain.model.Product;
import com.farmxchain.model.User;
import com.farmxchain.repository.UserRepository;
import com.farmxchain.security.JwtUtil;
import com.farmxchain.service.AlertService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alerts")
@CrossOrigin(origins = "*")
public class AlertController {

    private final AlertService alertService;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public AlertController(AlertService alertService,
                           UserRepository userRepository,
                           JwtUtil jwtUtil) {
        this.alertService = alertService;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    // ==============================
    // 👨‍🌾 FARMER → LOW STOCK ALERTS
    // ==============================
    @GetMapping("/low-stock")
    public List<Product> getLowStockAlerts(
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.replace("Bearer ", "");
        String uniqueId = jwtUtil.extractUniqueId(token);

        User farmer = userRepository.findByUniqueId(uniqueId)
            .orElseThrow(() -> new RuntimeException("Farmer not found"));

        return alertService.getLowStockProducts(farmer.getUniqueId());
    }
}
