package com.xuanlc.calendar.appuser;

import java.util.List;
import java.util.ArrayList;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<AppUser> getAllUsers() {
        List<AppUser> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users;
    }

    public AppUser getUser(Long id) {
        return userRepository.findById(id).get();
    }

    public void addUser(AppUser user) {
        userRepository.save(user);
    }
}