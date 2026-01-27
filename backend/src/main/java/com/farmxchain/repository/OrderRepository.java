package com.farmxchain.repository;

import com.farmxchain.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByFarmerUniqueId(String farmerUniqueId);

    List<Order> findByBuyerUniqueId(String buyerUniqueId);
}
