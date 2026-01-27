package com.farmxchain.controller;

import com.farmxchain.model.Product;
import com.farmxchain.repository.ProductRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/distributor")
@CrossOrigin(origins = "*")
@PreAuthorize("hasRole('DISTRIBUTOR')")
public class DistributorController {

    private final ProductRepository productRepository;

    public DistributorController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // ✅ GET WHOLESALE PRODUCTS ONLY
    @GetMapping("/products")
    public List<Product> getWholesaleProducts() {
        return productRepository.findByTargetRoleAndStatus("DISTRIBUTOR", "AVAILABLE");
    }
}
