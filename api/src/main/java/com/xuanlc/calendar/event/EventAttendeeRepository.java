package com.xuanlc.calendar.event;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

public interface EventAttendeeRepository extends CrudRepository<EventAttendee, Long> {

        List<EventAttendee> findByUserIdAndInstanceDatetimeBetweenAndIsDeletedFalseAndInstanceCanonIsAllDayFalse(
                        UUID userId, Instant start, Instant end);

        List<EventAttendee> findByUserIdAndInstanceDatetimeBetweenAndIsDeletedFalseAndInstanceCanonIsAllDayTrue(
                        UUID userId, Instant start, Instant end);

        List<EventAttendee> findByUserIdAndInstanceCanonIdAndInstanceDatetimeGreaterThanEqual(UUID userId,
                        Long canonicalId, Instant date);

        void deleteByInstanceId(Long instanceId);

        List<EventAttendee> findByInstanceId(Long instanceId);

        void deleteByInstanceCanonId(Long canonicalId);
}
