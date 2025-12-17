package com.example.digitalLibrary.DigitalLibrary.ai;

import com.example.digitalLibrary.DigitalLibrary.model.Book;
import com.google.cloud.vertexai.VertexAI;
import com.google.cloud.vertexai.api.GenerateContentResponse;
import com.google.cloud.vertexai.generativeai.GenerativeModel;
import com.example.digitalLibrary.DigitalLibrary.repo.BookRepo;
import com.example.digitalLibrary.DigitalLibrary.repo.BorrowRepo;
import com.example.digitalLibrary.DigitalLibrary.repo.ReviewRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AIService {

    private final BookRepo bookRepo;
    private final BorrowRepo borrowRepo;
    private final ReviewRepo reviewRepo;

    // Configuration injected from application.properties
    @Value("${gcp.project.id}")
    private String projectId;
    @Value("${gcp.location}")
    private String location;

    @Autowired
    public AIService(BookRepo bookRepo,
                     BorrowRepo borrowRepo,
                     ReviewRepo reviewRepo) {
        this.bookRepo = bookRepo;
        this.borrowRepo = borrowRepo;
        this.reviewRepo = reviewRepo;
    }

    // ---------------- GENERATE BOOK DESCRIPTION (Using Gemini) ----------------
    public String generateDescription(String title,
                                      String author,
                                      String category,
                                      String existingDescription) {

        String prompt = (existingDescription != null && !existingDescription.isBlank())
                ? "Improve this book description in simple, engaging language (max 100 words): " + existingDescription
                : "Write a simple, engaging, and clear book description (max 100 words): "
                + "Title: " + title + "; Author: " + author + "; Category: " + category + ".";

        try (VertexAI vertexAi = new VertexAI(projectId, location)) {

            GenerativeModel model = new GenerativeModel("gemini-2.5-flash", vertexAi);

            GenerateContentResponse response = model.generateContent(prompt);

            // 🟢 CORRECT FIX: Use the correct method chain to navigate the protobuf response object.
            // This structure resolves the "Cannot resolve method 'getText'" and 'getChoices' issues.
            String generatedText = response.getCandidates(0).getContent().getParts(0).getText();

            return generatedText.isEmpty() ? "AI returned empty content via Gemini." : generatedText;
        } catch (IOException e) {
            e.printStackTrace();
            System.err.println("Gemini Generation Failed. Check authentication/project setup.");
            return "AI Error: Unable to generate description (Gemini/VertexAI failed).";
        }
    }

    // ---------------- RECOMMEND BOOKS (Placeholder/Fallback) ----------------
    public List<Book> recommendForUser(String userId, int topK) {
        return bookRepo.findAll().stream().limit(topK).collect(Collectors.toList());
    }

    // ---------------- SEMANTIC SEARCH (Placeholder/Fallback) ----------------
    public List<Book> semanticSearch(String query) {
        String normalizedQuery = query.toLowerCase();
        return bookRepo.findAll().stream()
                .filter(book -> book.getTitle().toLowerCase().contains(normalizedQuery) ||
                        book.getAuthor().toLowerCase().contains(normalizedQuery) ||
                        book.getCategory().toLowerCase().contains(normalizedQuery))
                .collect(Collectors.toList());
    }

    // ---------------- SUMMARIZE REVIEWS (Placeholder) ----------------
    public String summarizeReviews(String bookId) {
        return "Review summary feature coming soon.";
    }
}