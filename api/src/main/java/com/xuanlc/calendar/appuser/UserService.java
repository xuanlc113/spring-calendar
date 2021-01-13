package com.xuanlc.calendar.appuser;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public AppUser getUser(UUID id) {
        return userRepository.findById(id).get();
    }

    public AppUser getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<AppUser> getUsersFromIds(List<UUID> userIds) {
        return userRepository.findByIdIn(userIds);
    }

    public void addUser(AppUser user) {
        userRepository.save(user);
    }

}