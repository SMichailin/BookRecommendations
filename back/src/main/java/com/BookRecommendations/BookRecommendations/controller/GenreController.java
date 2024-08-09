package com.BookRecommendations.BookRecommendations.controller;

import com.BookRecommendations.BookRecommendations.model.Genre;
import com.BookRecommendations.BookRecommendations.service.GenreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/genres")
@RequiredArgsConstructor
@CrossOrigin("*")
public class GenreController {
    private final GenreService genreService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Genre addGenre(@RequestBody Genre genre) {
        return genreService.addGenre(genre);
    }

    @GetMapping
    public List<Genre> getAllGenres() {
        return genreService.getAllGenres();
    }
    @PutMapping("/{id}")
    public Genre updateGenre(@PathVariable Long id, @RequestBody Genre genre) {
        return genreService.updateGenre(id, genre);
    }

    @DeleteMapping("/{id}")
    public void deleteGenre(@PathVariable Long id) {
        genreService.deleteGenre(id);
    }
}
