package com.example.digitalLibrary.DigitalLibrary.service;

import com.example.digitalLibrary.DigitalLibrary.model.Book;
import com.example.digitalLibrary.DigitalLibrary.repo.BookRepo;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {

  private final BookRepo bookRepo;

  public BookService(BookRepo bookRepo) {
    this.bookRepo = bookRepo;
  }

  public Optional<Book> getBookById(String id) {
    return bookRepo.findById(id);
  }

  public List<Book> getAllBooks() {
    return bookRepo.findAll();
  }


  public void deleteBook(String id) {
    // Soft delete: mark book as unavailable
    Book book = bookRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Book not found with id: " + id));
    book.setAvailable(false);
    bookRepo.save(book);
  }

  public List<Book> searchBooksByTitle(String title) {
    return bookRepo.findByTitle(title);
  }

  public List<Book> searchBooksByAuthor(String author) {
    return bookRepo.findByAuthor(author);
  }

  public List<Book> searchBooksByCategory(String category) {
    return bookRepo.findByCategory(category);
  }

  public Book saveBook(Book book) {
    return bookRepo.save(book);
  }

  public Book updateBook(String id, Book updateBook) {
    Book existingBook = bookRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Book not found with id: " + id));
    existingBook.setTitle(updateBook.getTitle());
    existingBook.setAuthor(updateBook.getAuthor());
    existingBook.setCategory(updateBook.getCategory());
    existingBook.setAvailable(updateBook.isAvailable());
    return bookRepo.save(existingBook);
  }
}
