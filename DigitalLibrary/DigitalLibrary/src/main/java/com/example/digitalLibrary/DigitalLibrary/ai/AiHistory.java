package com.example.digitalLibrary.DigitalLibrary.ai;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
@Document(collection = "ai_history")
public class AiHistory
{
    @Id
    private String id;
    private String userId;
    private String purpose;
    private String prompt;
    private String response;
    private LocalDateTime createdAt;
    public AiHistory() {}
    public AiHistory(String userId, String purpose, String prompt, String response)
    {
        this.userId = userId;
        this.purpose = purpose;
        this.prompt = prompt;
        this.response = response;
        this.createdAt = LocalDateTime.now();
    }
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getPurpose() { return purpose; }
    public void setPurpose(String purpose) { this.purpose = purpose; }
    public String getPrompt() { return prompt; }
    public void setPrompt(String prompt) { this.prompt = prompt; }
    public String getResponse() { return response; }
    public void setResponse(String response) { this.response = response; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}