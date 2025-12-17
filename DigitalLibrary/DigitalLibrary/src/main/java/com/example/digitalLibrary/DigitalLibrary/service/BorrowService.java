package com.example.digitalLibrary.DigitalLibrary.service;

import com.example.digitalLibrary.DigitalLibrary.model.Book;
import com.example.digitalLibrary.DigitalLibrary.model.Borrow;
import com.example.digitalLibrary.DigitalLibrary.repo.BookRepo;
import com.example.digitalLibrary.DigitalLibrary.repo.BorrowRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // Added for transactional safety

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BorrowService {

    private final BorrowRepo borrowRepo;
    private final BookRepo bookRepo;

    @Autowired
    public BorrowService(BorrowRepo borrowRepo, BookRepo bookRepo) {
        this.borrowRepo = borrowRepo;
        this.bookRepo = bookRepo;
    }

    // ✅ Borrow a book (Updated to set Book as unavailable)
    @Transactional
    public Borrow borrowBook(String userId, String bookId, String userName, String userPhone, LocalDate dueDate) {
        Book book = bookRepo.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found for ID: " + bookId));

        // 🎯 FIX 1: Check actual availability status
        if (!book.isAvailable()) {
            throw new RuntimeException("Book '" + book.getTitle() + "' is currently not available for borrow.");
        }

        // 🎯 FIX 2: Set the book status to unavailable in the database
        book.setAvailable(false);
        bookRepo.save(book);

        Borrow borrow = new Borrow();
        borrow.setUserId(userId);
        borrow.setBookId(bookId);
        borrow.setUserName(userName);
        borrow.setUserPhone(userPhone);
        borrow.setBorrowDate(LocalDate.now());
        borrow.setDueDate(dueDate);
        borrow.setActualReturnDate(null);

        // ✅ Attach updated book info for response
        borrow.setBook(book);

        return borrowRepo.save(borrow);
    }

    // ✅ Return a book and record the return date (Updated to set Book as available)
    @Transactional
    public Borrow returnBook(String borrowId) {
        Borrow record = borrowRepo.findById(borrowId)
                .orElseThrow(() -> new RuntimeException("Borrow record not found for ID: " + borrowId));

        if (record.getActualReturnDate() != null) {
            throw new RuntimeException("Book already returned on " + record.getActualReturnDate());
        }

        record.setActualReturnDate(LocalDate.now());

        // 🎯 FIX 3: Update Book availability in the database
        Optional<Book> optionalBook = bookRepo.findById(record.getBookId());
        if (optionalBook.isPresent()) {
            Book book = optionalBook.get();
            book.setAvailable(true); // Mark the book as available again
            bookRepo.save(book);
            record.setBook(book); // Attach updated book info for response
        } else {
            // Handle case where book might have been deleted, though unlikely
            throw new RuntimeException("Original book not found for return record: " + record.getBookId());
        }

        return borrowRepo.save(record);
    }

    // ... (rest of the methods remain the same) ...

    // ✅ Fetch borrow record by ID
    public Optional<Borrow> getBorrowRecordById(String id) {
        Optional<Borrow> record = borrowRepo.findById(id);
        record.ifPresent(borrow ->
                bookRepo.findById(borrow.getBookId()).ifPresent(borrow::setBook)
        );
        return record;
    }

    // ✅ Fetch all borrows by user with book info
    public List<Borrow> getBorrowRecordsByUser(String userId) {
        List<Borrow> borrows = borrowRepo.findByUserId(userId);
        for (Borrow borrow : borrows) {
            bookRepo.findById(borrow.getBookId()).ifPresent(borrow::setBook);
        }
        return borrows;
    }

    // ✅ Fetch all borrows for a book
    public List<Borrow> getBorrowRecordsByBook(String bookId) {
        List<Borrow> borrows = borrowRepo.findByBookId(bookId);
        for (Borrow borrow : borrows) {
            bookRepo.findById(borrow.getBookId()).ifPresent(borrow::setBook);
        }
        return borrows;
    }

    // ✅ Fetch all borrow records (for admin) with book info
    public List<Borrow> getAllBorrow() {
        List<Borrow> borrows = borrowRepo.findAll();
        for (Borrow borrow : borrows) {
            bookRepo.findById(borrow.getBookId()).ifPresent(borrow::setBook);
        }
        return borrows;
    }
}