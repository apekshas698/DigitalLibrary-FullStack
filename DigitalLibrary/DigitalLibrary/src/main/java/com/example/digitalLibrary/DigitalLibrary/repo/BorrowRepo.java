package com.example.digitalLibrary.DigitalLibrary.repo;

import com.example.digitalLibrary.DigitalLibrary.model.Borrow;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface BorrowRepo extends MongoRepository<Borrow,String>
{
    List<Borrow> findByUserId(String userId);
    List<Borrow> findByBookId(String bookId);
}
