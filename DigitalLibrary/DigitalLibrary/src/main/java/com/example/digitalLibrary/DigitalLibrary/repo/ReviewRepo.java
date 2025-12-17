package com.example.digitalLibrary.DigitalLibrary.repo;

import com.example.digitalLibrary.DigitalLibrary.model.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ReviewRepo extends MongoRepository<Review,String>
{
    List<Review> findByBookId(String bookId);
    List<Review> findByUserId(String userId);
}
