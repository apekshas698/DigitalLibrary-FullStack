package com.example.digitalLibrary.DigitalLibrary.service;
import com.example.digitalLibrary.DigitalLibrary.model.User;
import com.example.digitalLibrary.DigitalLibrary.repo.UserRepo;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public class UserService
{
    private final UserRepo userRepo;

    public UserService(UserRepo userRepo){
        this.userRepo=userRepo;
    }
    public User registerUser(User user) {
        return userRepo.save(user);
    }

    public Optional<User> getUserById(String id) {
        return userRepo.findById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public void deleteUser(String id) {
        userRepo.deleteById(id);

    }
}