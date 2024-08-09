package com.BookRecommendations.BookRecommendations.service;

import com.BookRecommendations.BookRecommendations.model.Book;
import com.BookRecommendations.BookRecommendations.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    public Book updateBook(Long id, Book book) {
        Optional<Book> existingBookOpt = bookRepository.findById(id);
        if (existingBookOpt.isPresent()) {
            Book existingBook = existingBookOpt.get();
            existingBook.setTitle(book.getTitle());
            existingBook.setGenre(book.getGenre());
            return bookRepository.save(existingBook);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found with id " + id);
        }
    }

    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }
}
