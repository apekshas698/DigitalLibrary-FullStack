package com.example.digitalLibrary.DigitalLibrary.security;

import com.example.digitalLibrary.DigitalLibrary.repo.UserRepo;
import com.example.digitalLibrary.DigitalLibrary.model.User;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class AppUserDetailsService implements UserDetailsService {
    private final UserRepo userRepo;
    public AppUserDetailsService(UserRepo userRepo) { this.userRepo = userRepo; }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User u = userRepo.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        String role = (u.getRole() == null) ? "USER" : u.getRole().replace("ROLE_", "");
        return org.springframework.security.core.userdetails.User
                .withUsername(u.getEmail())
                .password(u.getPassword())
                .roles(role)
                .build();
    }
}
