package com.farmxchain.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            // Disable everything related to default auth
            .csrf(csrf -> csrf.disable())
            .httpBasic(httpBasic -> httpBasic.disable())
            .formLogin(form -> form.disable())

            // Authorization only
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/api/users/login",
                    "/api/users/register",
                    "/api/users/**"
                ).permitAll()

                .requestMatchers("/api/admin/**").permitAll() 
                // TEMPORARY: allow admin APIs until JWT filter is added

                .anyRequest().permitAll()
            );

        return http.build();
    }
}
