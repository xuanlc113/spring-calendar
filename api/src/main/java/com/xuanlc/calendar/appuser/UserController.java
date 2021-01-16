package com.xuanlc.calendar.appuser;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/user/{id}")
    public AppUser getUser(@PathVariable UUID id) {
        return userService.getUser(id);
    }

    @GetMapping("/user/email/{email}")
    public AppUser getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

    @PostMapping("/user")
    public void addUser(@RequestBody AppUser user) {
        userService.addUser(user);
    }
}