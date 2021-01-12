package com.xuanlc.calendar.appuser;

import org.springframework.beans.factory.annotation.Autowired;
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
    public AppUser getUser(@PathVariable Long id) {
        return userService.getUser(id);
    }

    @PostMapping("/user")
    public void addUser(@RequestBody AppUser user) {
        userService.addUser(user);
    }
}