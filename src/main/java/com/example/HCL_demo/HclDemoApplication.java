package com.example.HCL_demo;

import com.example.HCL_demo.model.Role;
import com.example.HCL_demo.model.User;
import com.example.HCL_demo.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class HclDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(HclDemoApplication.class, args);
	}

	@Bean
	public CommandLineRunner initData(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		return args -> {
			if (userRepository.findByUsername("librarian").isEmpty()) {
				User librarian = new User();
				librarian.setUsername("librarian");
				librarian.setPassword(passwordEncoder.encode("librarian123"));
				librarian.setRole(Role.LIBRARIAN);
				userRepository.save(librarian);
			}
		};
	}
}
