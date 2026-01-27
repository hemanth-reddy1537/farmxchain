package com.farmxchain.repository;

import com.farmxchain.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // 👨‍🌾 Farmer view
    List<Product> findByFarmerUniqueId(String farmerUniqueId);

    // 🛒 Marketplaces
    List<Product> findByTargetRoleAndStatus(String targetRole, String status);

    // 📊 Admin
    long countByFarmerUniqueId(String farmerUniqueId);
}
