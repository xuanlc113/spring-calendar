package com.xuanlc.calendar.appuser;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public AppUser getUser(Long id) {
        return userRepository.findById(id).get();
    }

    public void addUser(AppUser user) {
        userRepository.save(user);
    }
}