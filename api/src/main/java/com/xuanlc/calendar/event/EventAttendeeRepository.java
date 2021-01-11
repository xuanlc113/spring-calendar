package com.xuanlc.calendar.event;

import java.time.Instant;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface EventAttendeeRepository extends CrudRepository<EventAttendee, Long> {

    List<EventAttendee> findByUserIdAndEventInstanceEventCanonicalIdAndEventInstanceDatetimeAfter(Long userId,
            Long canonicalId, Instant date);

    void deleteByEventInstanceId(Long instanceId);

    List<EventAttendee> findByEventInstanceId(Long instanceId);

    List<EventAttendee> findByEventInstanceEventCanonicalId(Long canonicalId);
}
