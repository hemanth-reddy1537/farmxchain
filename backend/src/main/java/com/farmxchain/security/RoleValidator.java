package com.farmxchain.security;

import com.farmxchain.model.Role;
import com.farmxchain.model.User;

public class RoleValidator {
    public static void requireFarmer(User user) {
        if (user.getRole() != Role.FARMER) {
            throw new RuntimeException("Access denied: Farmer role required");
        }
    }

    public static void requireCustomer(User user) {
        if (user.getRole() != Role.CUSTOMER) {
            throw new RuntimeException("Access denied: Customer role required");
        }
    }

    public static void requireDistributor(User user) {
        if (user.getRole() != Role.DISTRIBUTOR) {
            throw new RuntimeException("Access denied: Distributor role required");
        }
    }

    public static void requireAdmin(User user) {
        if (user.getRole() != Role.ADMIN) {
            throw new RuntimeException("Access denied: Admin role required");
        }
    }
}
