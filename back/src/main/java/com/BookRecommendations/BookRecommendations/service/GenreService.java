package com.BookRecommendations.BookRecommendations.service;

import com.BookRecommendations.BookRecommendations.model.Genre;
import com.BookRecommendations.BookRecommendations.repository.GenreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GenreService {
    private final GenreRepository genreRepository;

    public Genre addGenre(Genre genre) {
        Optional<Genre> existingGenre = genreRepository.findByName(genre.getName());
        if (existingGenre.isPresent()) {
            throw new RuntimeException("Genre already exists with name " + genre.getName());
        }
        return genreRepository.save(genre);
    }

    public List<Genre> getAllGenres() {
        return genreRepository.findAll();
    }

    public Genre updateGenre(Long id, Genre genre) {
        Optional<Genre> existingGenreOpt = genreRepository.findById(id);
        if (existingGenreOpt.isPresent()) {
            Genre existingGenre = existingGenreOpt.get();
            existingGenre.setName(genre.getName());
            return genreRepository.save(existingGenre);
        } else {
            throw new RuntimeException("Genre not found with id " + id);
        }
    }

    public void deleteGenre(Long id) {
        genreRepository.deleteById(id);
    }
}
