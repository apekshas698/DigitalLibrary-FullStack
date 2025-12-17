package com.example.digitalLibrary.DigitalLibrary.model;
import lombok .AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;
import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User
{
    @Id
    private String id;
    private String email;
    private String password;
    private String role;
    private List<String> wishlist = new ArrayList<>();
}
