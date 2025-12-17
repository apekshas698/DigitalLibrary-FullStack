package com.example.digitalLibrary.DigitalLibrary.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "review")
public class Review
{
    private String userId;
    private String bookId;
    private String comment;
    private String rating;
}
