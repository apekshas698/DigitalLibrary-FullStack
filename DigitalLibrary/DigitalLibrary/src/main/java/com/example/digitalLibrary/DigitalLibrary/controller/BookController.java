package com.example.digitalLibrary.DigitalLibrary.controller;

import com.example.digitalLibrary.DigitalLibrary.model.Book;
import com.example.digitalLibrary.DigitalLibrary.dto.Reviewdto;
import com.example.digitalLibrary.DigitalLibrary.repo.BookRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookRepo bookRepo;

    public BookController(BookRepo bookRepo) {
        this.bookRepo = bookRepo;
    }
    @GetMapping
    public List<Book> getAllBooks() {
        return bookRepo.findAll();
    }
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBook(@PathVariable String id) {
        return bookRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @PostMapping("/{id}/reviews")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addReview(@PathVariable String id, @RequestBody Reviewdto review) {
        Book book = bookRepo.findById(id).orElseThrow(
                () -> new RuntimeException("Book not found for ID: " + id)
        );
        book.getReviews().add(review);
        int newReviewCount = book.getReviews().size();
        double totalRating = book.getReviews().stream()
                .mapToInt(Reviewdto::getRating)
                .sum();
        double rawAverageRating = totalRating / newReviewCount;
        book.setReviewCount(newReviewCount);
        book.setAverageRating(Math.round(rawAverageRating * 10.0) / 10.0);
        bookRepo.save(book);
        return ResponseEntity.ok(book);
    }
}