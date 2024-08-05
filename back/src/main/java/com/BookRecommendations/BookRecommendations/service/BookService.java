package com.BookRecommendations.BookRecommendations.service;

import com.BookRecommendations.BookRecommendations.model.Book;
import com.BookRecommendations.BookRecommendations.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    public Book addBook(Book book) {
        return bookRepository.save(book);
    }
}
