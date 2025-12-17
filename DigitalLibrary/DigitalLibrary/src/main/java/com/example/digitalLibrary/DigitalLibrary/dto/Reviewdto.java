package com.example.digitalLibrary.DigitalLibrary.dto;

import java.time.LocalDateTime;

public class Reviewdto {
    private String id;
    private String bookId;
    private String userId;
    private String reviewText;
    private int rating;
    private LocalDateTime createdAt = LocalDateTime.now();

    public Reviewdto() {}

    public Reviewdto(String id, String bookId, String userId, String reviewText, int rating) {
        this.id = id;
        this.bookId = bookId;
        this.userId = userId;
        this.reviewText = reviewText;
        this.rating = rating;
        this.createdAt = LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getBookId() { return bookId; }
    public void setBookId(String bookId) { this.bookId = bookId; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getReviewText() { return reviewText; }
    public void setReviewText(String reviewText) { this.reviewText = reviewText; }

    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
