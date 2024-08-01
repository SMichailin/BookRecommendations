package com.BookRecommendations.BookRecommendations.controller;

import com.BookRecommendations.BookRecommendations.model.Book;
import com.BookRecommendations.BookRecommendations.repository.BookRepository;
import com.BookRecommendations.BookRecommendations.resourceNotFoundException.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
@CrossOrigin("*")
public class BookController {


    private final BookRepository bookRepository;

    @Autowired
    public BookController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @GetMapping
    public List<Book>getAllBooks(){
        return bookRepository.findAll();
    }
    @PostMapping
    public Book createBook(@RequestBody Book book){
        return bookRepository.save(book);
    }
    @PutMapping("/{id}")
    public Book updateBook(@PathVariable Long id, @RequestBody Book updatedBook) {
        Optional<Book> optionalBook = bookRepository.findById(id);
        if (optionalBook.isPresent()) {
            Book book = optionalBook.get();
            book.setTitle(updatedBook.getTitle());
            book.setDescription(updatedBook.getDescription());
            book.setIsbn(updatedBook.getIsbn());
            book.setImg(updatedBook.getImg());
            book.setGenre(updatedBook.getGenre());
            book.setNumOfPage(updatedBook.getNumOfPage());
            return bookRepository.save(book);
        } else {
            throw new ResourceNotFoundException("Book not found with id " + id);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id) {
        if (bookRepository.existsById(id)) {
            bookRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("Book not found with id " + id);
        }
    }
}
