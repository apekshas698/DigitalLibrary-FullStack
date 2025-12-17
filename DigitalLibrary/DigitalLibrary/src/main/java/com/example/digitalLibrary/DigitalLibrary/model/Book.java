package com.example.digitalLibrary.DigitalLibrary.model;

import com.example.digitalLibrary.DigitalLibrary.dto.Reviewdto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "books")
public class Book {
    @Id
    private String id;
    private String title;
    private String author;
    private String category;
    private boolean available = true;
    private String imageUrl;
    private String description;
    private double averageRating = 0.0;
    private int reviewCount = 0;
    private List<String> tags = new ArrayList<>();
    private List<Reviewdto> reviews = new ArrayList<>();
}