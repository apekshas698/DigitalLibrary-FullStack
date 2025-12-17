package com.example.digitalLibrary.DigitalLibrary.service;

import com.example.digitalLibrary.DigitalLibrary.model.Review;
import com.example.digitalLibrary.DigitalLibrary.repo.ReviewRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    private final ReviewRepo reviewRepository;

    public ReviewService(ReviewRepo reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public Review addReview(Review review) {
        return reviewRepository.save(review);
    }

    public Optional<Review> getReviewById(String id) {
        return reviewRepository.findById(id);
    }


    public List<Review> getReviewsByBook(String bookId) {
        return reviewRepository.findByBookId(bookId);
    }


    public List<Review> getReviewsByUser(String userId) {
        return reviewRepository.findByUserId(userId);
    }

    public void deleteReview(String id) {
        reviewRepository.deleteById(id);
    }
}
