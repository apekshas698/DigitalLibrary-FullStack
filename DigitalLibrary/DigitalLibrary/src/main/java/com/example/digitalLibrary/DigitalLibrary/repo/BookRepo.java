package com.example.digitalLibrary.DigitalLibrary.repo;

import com.example.digitalLibrary.DigitalLibrary.model.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface BookRepo extends MongoRepository<Book, String> {
    List<Book> findByTitle(String title);
    List<Book> findByAuthor(String author);
    List<Book> findByCategory(String category);
    List<Book> findByAvailableTrue();
}
