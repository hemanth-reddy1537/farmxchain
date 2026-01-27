package com.farmxchain.controller;

import com.farmxchain.model.Product;
import com.farmxchain.repository.ProductRepository;
import com.farmxchain.security.JwtUtil;
import com.farmxchain.service.ImageUploadService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ImageUploadService imageUploadService;

    @Autowired
    private JwtUtil jwtUtil;

    // ================= FARMER: ADD PRODUCT =================
    @PostMapping("/add")
    public ResponseEntity<?> addProduct(
            @RequestParam("images") MultipartFile[] images,
            @RequestParam("name") String name,
            @RequestParam("type") String type,
            @RequestParam("harvestDate") String harvestDate,
            @RequestParam("quantity") int quantity,
            @RequestParam("price") double price,
            @RequestParam("discount") double discount,
            @RequestParam("targetRole") String targetRole,
            @RequestHeader("Authorization") String authHeader
    ) throws Exception {

        String token = authHeader.replace("Bearer ", "");
        String farmerUniqueId = jwtUtil.extractUniqueId(token);

        Product product = new Product();
        product.setName(name);
        product.setType(type);
        product.setHarvestDate(LocalDate.parse(harvestDate));
        product.setQuantity(quantity);
        product.setPrice(price);
        product.setDiscount(discount);
        product.setQualityGrade("B");
        product.setFarmerUniqueId(farmerUniqueId);
        product.setTargetRole(targetRole.toUpperCase());
        product.setStatus("AVAILABLE");

        product.setImageUrls(imageUploadService.uploadMultiple(images));

        return ResponseEntity.ok(productRepository.save(product));
    }

    // ================= FARMER: MY CROPS =================
    @GetMapping("/my")
    public List<Product> myCrops(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String farmerUniqueId = jwtUtil.extractUniqueId(token);
        return productRepository.findByFarmerUniqueId(farmerUniqueId);
    }

    // ================= DISTRIBUTOR MARKET =================
    @GetMapping("/distributor")
    public List<Product> distributorMarket() {
        return productRepository.findByTargetRoleAndStatus("DISTRIBUTOR", "AVAILABLE");
    }

    // ================= CUSTOMER MARKET =================
    @GetMapping("/customer")
    public List<Product> customerMarket() {
        return productRepository.findByTargetRoleAndStatus("CUSTOMER", "AVAILABLE");
    }
}
