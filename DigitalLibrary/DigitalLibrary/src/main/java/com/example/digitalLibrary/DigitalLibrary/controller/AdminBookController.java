package com.example.digitalLibrary.DigitalLibrary.controller;

import com.example.digitalLibrary.DigitalLibrary.model.Book;
import com.example.digitalLibrary.DigitalLibrary.repo.BookRepo;
import com.example.digitalLibrary.DigitalLibrary.ai.AIService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/books")
@PreAuthorize("hasRole('ADMIN')")
public class AdminBookController {

    @Autowired
    private BookRepo bookRepo;

    @Autowired
    private AIService aiService;
    @PostMapping("/generate-description")
    public ResponseEntity<?> generateDescription(@RequestBody Map<String, String> req) {

        try {
            String title = req.get("title");
            String author = req.get("author");
            String category = req.get("category");
            String existingDescription = req.getOrDefault("existingDescription", "");

            if (title == null || author == null || category == null) {
                return ResponseEntity.badRequest().body("Missing required fields");
            }

            String result = aiService.generateDescription(title, author, category, existingDescription);
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("AI generation failed: " + e.getMessage());
        }
    }

    // ------------------- ADD BOOK -------------------
    @PostMapping
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        return ResponseEntity.ok(bookRepo.save(book));
    }

    // ------------------- UPDATE BOOK -------------------
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBook(@PathVariable String id, @RequestBody Book updatedBook) {

        Optional<Book> optionalBook = bookRepo.findById(id);

        if (optionalBook.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Book book = optionalBook.get();

        book.setTitle(updatedBook.getTitle());
        book.setAuthor(updatedBook.getAuthor());
        book.setCategory(updatedBook.getCategory());
        book.setAvailable(updatedBook.isAvailable());
        book.setImageUrl(updatedBook.getImageUrl());

        // 🐛 FIX: Add updatedBook.getDescription() to persist the description field.
        book.setDescription(updatedBook.getDescription());

        if (updatedBook.getTags() != null) {
            // NOTE: The request body also implicitly contains the original reviews and
            // rating, so they are preserved unless explicitly overwritten.
            book.setTags(updatedBook.getTags());
        }

        return ResponseEntity.ok(bookRepo.save(book));
    }

    // ------------------- DELETE BOOK -------------------
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable String id) {
        if (!bookRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        bookRepo.deleteById(id);
        return ResponseEntity.ok("Book deleted successfully");
    }

    // ------------------- GET ALL BOOKS -------------------
    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        return ResponseEntity.ok(bookRepo.findAll());
    }
}