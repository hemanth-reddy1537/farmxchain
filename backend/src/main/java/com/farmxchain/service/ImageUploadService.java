package com.farmxchain.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ImageUploadService {

    @Autowired
    private Cloudinary cloudinary;

    // ✅ MULTIPLE IMAGE UPLOAD
    public List<String> uploadMultiple(MultipartFile[] files) throws Exception {

        List<String> imageUrls = new ArrayList<>();

        if (files == null || files.length == 0) {
            return imageUrls;
        }

        for (MultipartFile file : files) {
            if (file.isEmpty()) continue;

            Map<?, ?> uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap("folder", "farmxchain/products")
            );

            imageUrls.add(uploadResult.get("secure_url").toString());
        }

        return imageUrls;
    }
}
