package com.xuanlc.calendar.appuser;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<AppUser, Long> {

    List<AppUser> findByIdIn(List<Long> userIds);
}