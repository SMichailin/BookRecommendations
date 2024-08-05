package com.BookRecommendations.BookRecommendations.repository;

import com.BookRecommendations.BookRecommendations.model.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Long> {
}
