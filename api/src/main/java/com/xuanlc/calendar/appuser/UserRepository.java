package com.xuanlc.calendar.appuser;

import java.util.List;

import com.xuanlc.calendar.contact.Contact;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<AppUser, Long> {

    @Query(value = "SELECT * FROM contact WHERE is_accepted IN (SELECT sender FROM app_user user where user.id = :id) = true", nativeQuery = true)
    List<Contact> findContactsById(Long id);

    @Query(value = "SELECT * FROM contact WHERE is_accepted IN (SELECT receiver FROM app_user user where user.id = :id) = false", nativeQuery = true)
    List<Contact> findContactRequestsById(Long id);
}