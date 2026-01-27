package com.farmxchain.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // 🔑 SAME secret used everywhere
    private static final String SECRET_KEY =
            "farmxchain_super_secret_key_which_is_very_secure_12345";

    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24*7; // 24 hours

    private final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    // ✅ Generate token
    public String generateToken(String uniqueId, String role) {
        return Jwts.builder()
                .setSubject(uniqueId) // 👈 SUBJECT = UNIQUE_ID
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // ✅ Extract uniqueId
    public String extractUniqueId(String token) {
        return extractAllClaims(token).getSubject();
    }

    // ✅ Extract role
    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }

    // ✅ Validate token (THIS WAS BROKEN EARLIER)
    public boolean validateToken(String token) {
        try {
            extractAllClaims(token);
            return true;
        } catch (Exception e) {
            System.out.println("JWT validation error: " + e.getMessage());
            return false;
        }
    }

    // 🔐 Internal helper
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
