package com.BookRecommendations.BookRecommendations.repository;

import com.BookRecommendations.BookRecommendations.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUserName(String userName);  // Add this line
}
