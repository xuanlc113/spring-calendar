package com.xuanlc.calendar.appuser;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<AppUser, UUID> {

    Optional<AppUser> findByEmail(String email);

    List<AppUser> findByIdIn(List<UUID> userIds);
}