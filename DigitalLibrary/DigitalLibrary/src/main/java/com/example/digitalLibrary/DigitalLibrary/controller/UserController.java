package com.example.digitalLibrary.DigitalLibrary.controller;

import com.example.digitalLibrary.DigitalLibrary.model.Book;
import com.example.digitalLibrary.DigitalLibrary.model.User;
import com.example.digitalLibrary.DigitalLibrary.repo.UserRepo;
import com.example.digitalLibrary.DigitalLibrary.repo.BookRepo;
import com.example.digitalLibrary.DigitalLibrary.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
public class UserController
{
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private BookRepo bookRepo;
    @GetMapping("/count")
    public Map<String, Integer> getTotalUsers() {
        int totalUsers = userRepo.findAll().size();
        return Collections.singletonMap("totalUsers", totalUsers);
    }
    @GetMapping("/wishlist")
    public ResponseEntity<?> getWishlist(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String email = jwtUtil.extractEmail(token);

            Optional<User> optionalUser = userRepo.findByEmail(email);
            if (optionalUser.isEmpty()) {
                return ResponseEntity.status(404).body("User not found.");
            }

            User user = optionalUser.get();
            List<String> wishlistIds = user.getWishlist();
            List<Book> wishlistBooks = wishlistIds.stream()
                    .map(id -> bookRepo.findById(id).orElse(null))
                    .filter(book -> book != null)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(wishlistBooks);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error fetching wishlist: " + e.getMessage());
        }
    }
    @PostMapping("/wishlist")
    public ResponseEntity<?> toggleWishlist(@RequestHeader("Authorization") String authHeader,
                                            @RequestBody Map<String, String> request) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String email = jwtUtil.extractEmail(token);
            String bookId = request.get("bookId");

            if (bookId == null || bookId.isEmpty()) {
                return ResponseEntity.badRequest().body("Missing bookId in request.");
            }

            Optional<User> optionalUser = userRepo.findByEmail(email);
            if (optionalUser.isEmpty()) {
                return ResponseEntity.status(404).body("User not found.");
            }

            User user = optionalUser.get();
            List<String> wishlist = user.getWishlist();
            String message;

            if (wishlist.contains(bookId)) {
                wishlist.remove(bookId);
                message = "Book removed from wishlist.";
            } else {
                wishlist.add(bookId);
                message = "Book added to wishlist.";
            }

            userRepo.save(user);
            return ResponseEntity.ok(Map.of("message", message, "wishlist", wishlist));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error processing wishlist request: " + e.getMessage());
        }
    }
}