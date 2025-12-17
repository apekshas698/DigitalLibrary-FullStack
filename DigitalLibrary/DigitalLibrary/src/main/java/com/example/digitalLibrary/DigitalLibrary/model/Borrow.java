package com.example.digitalLibrary.DigitalLibrary.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "borrow")
public class Borrow {
    @Id
    private String id;

    private String userId;
    private String bookId;
    private LocalDate borrowDate;
    private LocalDate dueDate;
    private LocalDate actualReturnDate;
    private String userName;
    private String userPhone;
    @Transient
    private Book book;
    public Long getDaysKept() {
        if (borrowDate != null && actualReturnDate != null) {
            return ChronoUnit.DAYS.between(borrowDate, actualReturnDate);
        }
        return null;
    }
}
