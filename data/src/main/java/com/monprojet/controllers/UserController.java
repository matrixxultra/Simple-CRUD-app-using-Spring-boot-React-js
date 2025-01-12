package com.monprojet.controllers;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.monprojet.entities.User;
import com.monprojet.reposotries.UserReposotry;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173") 
public class UserController {
	@Autowired
    private UserReposotry userRepository;

	 @GetMapping("/lister")
	   public List<User> lister() {
	        return userRepository.findAll(); 
	   }
	 @PostMapping("/add")
	   public User addUser(@RequestBody User user) {
	        return userRepository.save(user); // Save user to database
	    }
	 @PostMapping("/edit")
	   public User editUser(@RequestBody User user) {
	        return userRepository.save(user); 
	    }
	 
	 @DeleteMapping("/delete/{id}")
	   public void addUser(@PathVariable("id") int id) {
	        userRepository.deleteById(id); 
	    }
}
