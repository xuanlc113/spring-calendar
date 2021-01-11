package com.xuanlc.calendar.event;

import java.time.Instant;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface EventAttendeeRepository extends CrudRepository<EventAttendee, Long> {

    List<EventAttendee> findByUserIdAndInstanceDatetimeBetween(Long userId, Instant start, Instant end);

    List<EventAttendee> findByUserIdAndInstanceCanonIdAndInstanceDatetimeGreaterThanEqual(Long userId, Long canonicalId,
            Instant date);

    void deleteByInstanceId(Long instanceId);

    List<EventAttendee> findByInstanceId(Long instanceId);

    List<EventAttendee> findByInstanceCanonId(Long canonicalId);
}
