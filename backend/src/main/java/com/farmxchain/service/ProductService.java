package com.farmxchain.service;

import com.farmxchain.model.Product;
import com.farmxchain.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // ✅ Add product
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    // ✅ Get all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
 // ✅ Add this method inside your ProductService class
    public void deleteProduct(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
        } else {
            throw new RuntimeException("Product not found with id: " + id);
        }
    }

    // ✅ Ensure you also have the getProductById method for the Update logic
  

    // ✅ Get products by farmer (by uniqueId)
    public List<Product> getProductsByFarmer(String farmerUniqueId) {
        return productRepository.findByFarmerUniqueId(farmerUniqueId);
    }
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

}
