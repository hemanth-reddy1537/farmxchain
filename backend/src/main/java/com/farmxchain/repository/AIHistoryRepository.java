package com.farmxchain.repository;

import com.farmxchain.model.AIHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AIHistoryRepository extends JpaRepository<AIHistory, Long> {

    List<AIHistory> findByProductIdOrderByCreatedAtDesc(Long productId);

}
