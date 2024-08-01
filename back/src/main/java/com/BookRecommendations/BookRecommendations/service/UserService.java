package com.BookRecommendations.BookRecommendations.service;

import com.BookRecommendations.BookRecommendations.model.User;
import com.BookRecommendations.BookRecommendations.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User registerUser(User user) {
        // Užtikrinkite, kad vartotojas pateikia slaptažodį
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Password is required");
        }
        user.setName(user.getName());
        user.setEmail(user.getEmail());
        user.setUserName(user.getUsername());
        // Užšifruokite slaptažodį
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        // Nustatykite pradinę rolę, pavyzdžiui, "ROLE_USER"
        user.setRole("ROLE_USER");

        // Išsaugokite vartotoją duomenų bazėje
        return userRepository.save(user);
    }
}
