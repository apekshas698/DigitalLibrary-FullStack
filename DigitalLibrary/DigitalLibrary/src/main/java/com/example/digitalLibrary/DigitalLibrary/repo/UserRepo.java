package com.example.digitalLibrary.DigitalLibrary.repo;

import com.example.digitalLibrary.DigitalLibrary.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepo extends MongoRepository<User,String>
{
    @Override
    Optional<User> findById (String s);
    Optional<User> findByEmail(String email);
}
