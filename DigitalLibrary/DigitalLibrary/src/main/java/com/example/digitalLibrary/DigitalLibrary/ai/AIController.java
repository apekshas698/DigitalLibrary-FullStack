package com.example.digitalLibrary.DigitalLibrary.ai;
import com.example.digitalLibrary.DigitalLibrary.model.Book;
import com.example.digitalLibrary.DigitalLibrary.ai.dto.SearchRequest;
import com.example.digitalLibrary.DigitalLibrary.ai.dto.DescriptionRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    // Recommend books for a user
    @PostMapping("/recommend/{userId}")
    public ResponseEntity<List<Book>> recommendForUser(@PathVariable String userId,
                                                       @RequestParam(defaultValue = "6") int topK) {
        List<Book> recs = aiService.recommendForUser(userId, topK);
        return ResponseEntity.ok(recs);
    }

    // Natural-language search
    @PostMapping("/search")
    public ResponseEntity<List<Book>> search(@RequestBody SearchRequest req) {
        List<Book> hits = aiService.semanticSearch(req.query);
        return ResponseEntity.ok(hits);
    }

    // Summarize reviews for a book
    @GetMapping("/summarizeReviews/{bookId}")
    public ResponseEntity<String> summarizeReviews(@PathVariable String bookId) {
        String summary = aiService.summarizeReviews(bookId);
        return ResponseEntity.ok(summary);
    }

    // Generate book description (admin usage)
    @PostMapping("/generateDescription")
    public ResponseEntity<String> generateDescription(@RequestBody DescriptionRequest req) {
        String generated = aiService.generateDescription(req.title, req.author, req.category, req.existingDescription);
        return ResponseEntity.ok(generated);
    }
}