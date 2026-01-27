package com.farmxchain.service;

import com.farmxchain.model.Order;
import com.farmxchain.model.Product;
import com.farmxchain.repository.OrderRepository;
import com.farmxchain.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    // ==============================
    // CONSTRUCTOR INJECTION
    // ==============================
    public OrderService(OrderRepository orderRepository,
                        ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    public Order createOrder(Order order) {

        Product product = productRepository.findById(order.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (product.getQuantity() < order.getQuantity()) {
            throw new RuntimeException("Insufficient stock");
        }

        // Reduce stock
        product.setQuantity(product.getQuantity() - order.getQuantity());
        productRepository.save(product);

        order.setStatus("PENDING");
        return orderRepository.save(order);
    }

    // ==============================
    // GET ALL ORDERS
    // ==============================
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // ==============================
    // GET ORDER BY ID
    // ==============================
    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Order not found with id: " + id));
    }

    // ==============================
    // UPDATE ORDER STATUS
    // ==============================
    @Transactional
    public Order updateStatus(Long orderId, String newStatus) {

        Order order = getOrderById(orderId);
        String currentStatus = order.getStatus();

        // ❌ Closed orders cannot change
        if ("DELIVERED".equals(currentStatus) || "REJECTED".equals(currentStatus)) {
            throw new RuntimeException("Order already closed");
        }

        // ❌ Invalid flow
        if ("PENDING".equals(currentStatus) && "DELIVERED".equals(newStatus)) {
            throw new RuntimeException("Order must be ACCEPTED before delivery");
        }

        if ("ACCEPTED".equals(currentStatus) && "PENDING".equals(newStatus)) {
            throw new RuntimeException("Invalid status transition");
        }

        order.setStatus(newStatus);
        return orderRepository.save(order);
    }

    // ==============================
    // DELETE ORDER
    // ==============================
    public void deleteOrder(Long id) {
        if (!orderRepository.existsById(id)) {
            throw new RuntimeException("Order not found with id: " + id);
        }
        orderRepository.deleteById(id);
    }

    // ==============================
    // FARMER ORDERS
    // ==============================
    public List<Order> getOrdersByFarmer(String farmerUniqueId) {
        return orderRepository.findByFarmerUniqueId(farmerUniqueId);
    }

    // ==============================
    // CUSTOMER ORDERS
    // ==============================
    public List<Order> getOrdersByCustomer(String customerUniqueId) {
        return orderRepository.findByBuyerUniqueId(customerUniqueId);
    }
}
