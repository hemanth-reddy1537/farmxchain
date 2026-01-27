package com.farmxchain.service;

import com.farmxchain.dto.AdminUserBasicDto;
import com.farmxchain.dto.AdminUserHistoryResponseDto;
import com.farmxchain.model.User;
import com.farmxchain.repository.AIHistoryRepository;
import com.farmxchain.repository.OrderRepository;
import com.farmxchain.repository.ProductRepository;
import com.farmxchain.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AdminHistoryService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final AIHistoryRepository aiHistoryRepository;

    public AdminHistoryService(
            UserRepository userRepository,
            ProductRepository productRepository,
            OrderRepository orderRepository,
            AIHistoryRepository aiHistoryRepository
    ) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.aiHistoryRepository = aiHistoryRepository;
    }

    public AdminUserHistoryResponseDto getUserHistory(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        AdminUserBasicDto userDto = new AdminUserBasicDto(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getRole().name()
        );

        String role = user.getRole().name().toLowerCase();
        Map<String, Object> data = new HashMap<>();

        switch (role) {

        case "farmer" -> {

            var products = productRepository.findByFarmerUniqueId(user.getUniqueId());
            data.put("productsAdded", products);

            data.put("ordersReceived", orderRepository.findByFarmerUniqueId(user.getUniqueId()));

            var aiHistory = products.stream()
                    .flatMap(p ->
                            aiHistoryRepository
                                    .findByProductIdOrderByCreatedAtDesc(p.getId())
                                    .stream()
                    )
                    .toList();

            data.put("aiHistory", aiHistory);
        }

        case "customer" -> {
            data.put("ordersPlaced", orderRepository.findByBuyerUniqueId(user.getUniqueId()));
        }

        case "distributor" -> {
            data.put("info", "Distributor orders are not tracked in orders table");
        }

        default -> throw new RuntimeException("Unsupported role: " + role);
    }

        return new AdminUserHistoryResponseDto(userDto, role, data);
    }
}
