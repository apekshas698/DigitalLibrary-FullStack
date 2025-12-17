package com.example.digitalLibrary.DigitalLibrary;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
public class PasswordHasher {

    public static void main(String[] args) {

        String rawPassword = "admin123";
        // ---------------------

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String hashedPassword = encoder.encode(rawPassword);

        System.out.println("\n===============================================");
        System.out.println("  BCRYPT HASH GENERATOR");
        System.out.println("===============================================");
        System.out.println("Raw Password: " + rawPassword);
        System.out.println("Generated Hash (COPY THIS):");
        System.out.println(hashedPassword);
        System.out.println("===============================================\n");
    }
}
