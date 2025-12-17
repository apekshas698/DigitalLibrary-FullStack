package com.example.digitalLibrary.DigitalLibrary.controller;

import com.example.digitalLibrary.DigitalLibrary.model.Book;
import com.example.digitalLibrary.DigitalLibrary.model.Borrow;
import com.example.digitalLibrary.DigitalLibrary.model.User;
import com.example.digitalLibrary.DigitalLibrary.repo.UserRepo;
import com.example.digitalLibrary.DigitalLibrary.security.JwtUtil;
import com.example.digitalLibrary.DigitalLibrary.service.BookService;
import com.example.digitalLibrary.DigitalLibrary.service.BorrowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/borrow")
public class BorrowController {

    private final BorrowService borrowService;
    private final BookService bookService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    public BorrowController(BookService bookService, BorrowService borrowService) {
        this.bookService = bookService;
        this.borrowService = borrowService;
    }

    @GetMapping("/all")
    public List<Borrow> getAllBorrow() {
        return borrowService.getAllBorrow();
    }

    // POST /api/borrow
    // body: { bookId, name, phone, dueDate }  (dueDate = "YYYY-MM-DD")
    @PostMapping
    public ResponseEntity<?> borrowBook(@RequestHeader("Authorization") String authHeader,
                                        @RequestBody Map<String, String> req) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String email = jwtUtil.extractEmail(token);

            Optional<User> optionalUser = userRepo.findByEmail(email);
            if (optionalUser.isEmpty()) {
                return ResponseEntity.badRequest().body("User not found with email: " + email);
            }

            User user = optionalUser.get();

            String bookId = req.get("bookId");
            String name = req.get("name");
            String phone = req.get("phone");
            String dueDateStr = req.get("dueDate"); // expected "yyyy-MM-dd"

            if (bookId == null || name == null || phone == null || dueDateStr == null) {
                return ResponseEntity.badRequest().body("Missing required fields: bookId, name, phone, dueDate");
            }

            LocalDate dueDate;
            try {
                dueDate = LocalDate.parse(dueDateStr);
            } catch (Exception e) {
                return ResponseEntity.badRequest().body("Invalid dueDate format. Use YYYY-MM-DD");
            }

            // validate book exists
            Optional<Book> optionalBook = bookService.getBookById(bookId);
            if (optionalBook.isEmpty()) {
                return ResponseEntity.badRequest().body("Book not found with id: " + bookId);
            }

            Borrow saved = borrowService.borrowBook(user.getId(), bookId, name, phone, dueDate);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // PUT /api/borrow/{borrowId}/return
    @PutMapping("/{borrowId}/return")
    public ResponseEntity<?> returnBook(@PathVariable String borrowId) {
        try {
            Borrow returnedRecord = borrowService.returnBook(borrowId);
            return ResponseEntity.ok(returnedRecord);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/myrecords")
    public List<Borrow> getMyBorrowRecords(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String email = jwtUtil.extractEmail(token);

        Optional<User> optionalUser = userRepo.findByEmail(email);
        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found with email: " + email);
        }

        return borrowService.getBorrowRecordsByUser(optionalUser.get().getId());
    }
}
