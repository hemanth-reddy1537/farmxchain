package com.farmxchain.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long productId;
    private String productName;

    private String farmerUniqueId;
    private String buyerUniqueId;
    private String buyerRole;

    private int quantity;
    private double price;
    private double totalPrice;

    private String status;
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.status == null) {
            this.status = "PENDING";
        }
    }

    // ===== Getters & Setters =====
    public Long getId() { return id; }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public String getFarmerUniqueId() { return farmerUniqueId; }
    public void setFarmerUniqueId(String farmerUniqueId) { this.farmerUniqueId = farmerUniqueId; }

    public String getBuyerUniqueId() { return buyerUniqueId; }
    public void setBuyerUniqueId(String buyerUniqueId) { this.buyerUniqueId = buyerUniqueId; }

    public String getBuyerRole() { return buyerRole; }
    public void setBuyerRole(String buyerRole) { this.buyerRole = buyerRole; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(double totalPrice) { this.totalPrice = totalPrice; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
}
